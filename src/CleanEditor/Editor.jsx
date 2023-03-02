import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import queryString from 'query-string';
import { EditorContextWrapper } from './Context/EditorContextWrapper';
import { defaults, cloneDeep, isEqual, isEmpty, debounce, omit } from 'lodash';
import EditorHeader from './Header';
import { componentTypes as allComponentTypes } from './WidgetManager/components';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-hot-toast';
const { produce, enablePatches, setAutoFreeze, applyPatches } = require('immer');
import { initEditorWalkThrough } from '@/_helpers/createWalkThrough';

import {
  onComponentOptionChanged,
  onComponentOptionsChanged,
  onEvent,
  onQueryConfirmOrCancel,
  runQuery,
  setStateAsync,
  computeComponentState,
  getSvgIcon,
  debuggerActions,
  cloneComponents,
  removeSelectedComponent,
} from '@/_helpers/appUtils';

import {
  datasourceService,
  dataqueryService,
  appService,
  authenticationService,
  appVersionService,
  orgEnvironmentVariableService,
} from '@/_services';

export const Editor = (props) => {
  const defaultPageId = uuid();
  const appId = uuid();

  const defaultDefinition = {
    showViewerNavigation: true,
    homePageId: defaultPageId,
    pages: {
      [defaultPageId]: {
        components: {},
        handle: 'home',
        name: 'Home',
      },
    },
    globalSettings: {
      hideHeader: false,
      appInMaintenance: false,
      canvasMaxWidth: 1292,
      canvasMaxWidthType: 'px',
      canvasMaxHeight: 2400,
      canvasBackgroundColor: props.darkMode ? '#2f3c4c' : '#edeff5',
      backgroundFxQuery: '',
    },
  };

  const dataSourceModalRef = React.createRef();
  const canvasContainerRef = React.createRef();
  const selectionRef = React.createRef();
  const selectionDragRef = React.createRef();

  const queryManagerPreferences = JSON.parse(localStorage.getItem('queryManagerPreferences')) ?? {};

  const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
  const [app, setApp] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [editingVersion, setEditingVersion] = useState(null);
  const [loadingDataSources, setLoadingDataSources] = useState(true);
  const [loadingDataQueries, setLoadingDataQueries] = useState(true);
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [currentLayout, setCurrentLayout] = useState('desktop');
  const [deviceWindowWidth, setDeviceWindowWidth] = useState(450);
  const [appDefinition, setAppDefinition] = useState(defaultDefinition);

  const [currentState, setCurrentState] = useState({
    queries: {},
    components: {},
    globals: {
      currentUser: {},
      theme: { name: props.darkMode ? 'dark' : 'light' },
      urlparams: JSON.parse(JSON.stringify(queryString.parse(props.location.search))),
    },
    errors: {},
    variables: {},
    client: {},
    server: {},
    page: {
      handle: '',
      variables: {},
    },
  });
  const [apps, setApps] = useState([]);
  const [dataQueriesDefaultText, setDataQueriesDefaultText] = useState('No queries added');
  const [isDeletingDataQuery, setIsDeletingDataQuery] = useState(false);
  const [queryConfirmationList, setQueryConfirmationList] = useState([]);
  const [showCreateVersionModalPrompt, setShowCreateVersionModalPrompt] = useState(false);
  const [isSourceSelected, setIsSourceSelected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUnsavedQueriesAvailable, setIsUnsavedQueriesAvailable] = useState(false);
  const [selectionInProgress, setSelectionInProgress] = useState(false);
  const [scrollOptions, setScrollOptions] = useState({
    container: canvasContainerRef.current,
    throttleTime: 30,
    threshold: 0,
  });
  const [currentPageId, setCurrentPageId] = useState(defaultPageId);
  const [pages, setPages] = useState({});
  const [draftQuery, setDraftQuery] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState(null);

  const [appDefinitionLocalVersion, setAppDefinitionLocalVersion] = useState(null);
  const [saveError, setSaveError] = useState(false);
  const [defaultComponentStateComputed, setDefaultComponentStateComputed] = useState(null);
  const [currentVersion, setCurrentVersion] = useState({});
  const [currentVersionChanges, setCurrentVersionChanges] = useState({});
  const [noOfVersionsSupported, setNoOfVersionsSupported] = useState(100);

  const [slug, setSlug] = useState(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const [currentSidebarTab, setCurrentSidebarTab] = useState(2);
  const [selectedComponents, setSelectedComponents] = useState([]);

  const initComponentVersioning = () => {
    setCurrentVersion({ [currentPageId]: -1 });
    setCurrentVersionChanges({});
    setNoOfVersionsSupported(100);
    setCanUndo(false);
    setCanRedo(false);
  };

  const isVersionReleased = (version = editingVersion) => {
    if (isEmpty(version)) {
      return false;
    }

    return app.current_version_id === version.id;
  };

  const saveEditingVersion = () => {
    if (isVersionReleased()) {
      setIsSaving(false);
      setShowCreateVersionModalPrompt(true);
    } else if (!isEmpty(editingVersion)) {
      appVersionService
        .save(appId, editingVersion.id, { definition: appDefinition })
        .then(() => {
          setSaveError(false);
          setEditingVersion({
            ...editingVersion,
            ...{ definition: appDefinition },
          });
          setIsSaving(false);
        })
        .catch(() => {
          setSaveError(true);
          setIsSaving(false);
          toast.error('App could not save.');
        });
    }
  };

  const handleEvent = (eventName, options) => onEvent(this, eventName, options, 'edit');

  const switchPage = (pageId, queryParams = []) => {
    if (currentPageId === pageId) return;

    const { name, handle, events } = appDefinition.pages[pageId];
    const currentPageId = currentPageId;

    if (!name || !handle) return;

    const queryParamsString = queryParams.map(([key, value]) => `${key}=${value}`).join('&');

    props.history.push(`/apps/${appId}/${handle}?${queryParamsString}`);

    const { globals: existingGlobals } = currentState;

    const page = {
      id: pageId,
      name,
      handle,
      variables: pages?.[pageId]?.variables ?? {},
    };

    const globals = {
      ...existingGlobals,
      urlparams: JSON.parse(JSON.stringify(queryString.parse(queryParamsString))),
    };

    setAppDefinition((appDefinition) => {
      setCurrentState((currentState) => {
        setCurrentPageId((currentPageId) => {
          setPages((pages) => ({
            ...pages,
            [currentPageId]: {
              ...(pages?.[currentPageId] ?? {}),
              variables: {
                ...(currentState?.page?.variables ?? {}),
              },
            },
          }));
          return pageId;
        });

        return computeComponentState(
          {
            ...currentState,
            globals,
            page,
          },
          appDefinition.pages[pageId]?.components ?? {}
        );
      });

      return appDefinition;
    });

    setDefaultComponentStateComputed(true);

    for (const event of events ?? []) {
      handleEvent(event.eventId, event);
    }
  };

  const handleAddPatch = (patches, inversePatches) => {
    if (isEmpty(patches) && isEmpty(inversePatches)) return;
    if (isEqual(patches, inversePatches)) return;

    const currentPage = currentPageId;
    const currentVersion = currentVersion[currentPage] ?? -1;

    currentVersionChanges[currentPage] = currentVersionChanges[currentPage] ?? {};

    currentVersionChanges[currentPage][currentVersion] = {
      redo: patches,
      undo: inversePatches,
    };

    setCanUndo(currentVersionChanges[currentPage].hasOwnProperty(currentVersion));
    setCanRedo(currentVersionChanges[currentPage].hasOwnProperty(currentVersion + 1));

    currentVersion[currentPage] = currentVersion + 1;

    delete currentVersionChanges[currentPage][currentVersion + 1];
    delete currentVersionChanges[currentPage][currentVersion - noOfVersionsSupported];
  };

  const appDefinitionChanged = (newDefinition, opts = {}) => {
    if (isEqual(appDefinition, newDefinition)) return;

    if (opts?.versionChanged) {
      setCurrentPageId(newDefinition.homePageId);
      setIsSaving(true);
      setAppDefinition(newDefinition);
      setAppDefinitionLocalVersion(uuid());

      if (!opts.skipAutoSave) autoSave();
      switchPage(currentPageId);

      return;
    }

    produce(
      appDefinition,
      (draft) => {
        draft.pages[currentPageId].components = newDefinition.pages[currentPageId]?.components ?? {};
      },
      handleAddPatch
    );

    setIsSaving(true);
    setAppDefinition(newDefinition);
    setAppDefinitionLocalVersion(uuid());
    if (!opts.skipAutoSave) autoSave();

    computeComponentState(this, newDefinition.pages[currentPageId]?.components ?? {});
  };

  const autoSave = debounce(saveEditingVersion, 3000);
  const realtimeSave = debounce(appDefinitionChanged, 500);

  const appVersionPreviewLink = editingVersion
    ? `/applications/${app.id}/versions/${editingVersion.id}/${currentState.page.handle}`
    : '';

  const fetchApps = (page) => {
    appService.getAll(page).then((data) => setApps(data.apps));
  };

  const runQueries = (queries) => {
    queries.forEach((query) => {
      if (query.options.runOnPageLoad) {
        runQuery(this, query.id, query.name);
      }
    });
  };

  const setWindowTitle = (name) => {
    document.title = name ? `${name} - Tooljet` : `Untitled App - Tooljet`;
  };

  const fetchApp = (startingPageHandle) => {
    const appId = props.match.params.id;

    const callBack = async (data) => {
      let dataDefinition = defaults(data.definition, defaultDefinition);

      const pages = Object.entries(dataDefinition.pages).map(([pageId, page]) => ({ id: pageId, ...page }));
      const startingPageId = pages.filter((page) => page.handle === startingPageHandle)[0]?.id;
      const homePageId = startingPageId ?? dataDefinition.homePageId;

      setApp(data);
      setIsLoading(false);
      setIsLoading(false);
      setEditingVersion(data.editing_version);
      setAppDefinition(dataDefinition);
      setSlug(data.slug);
      setCurrentPageId(homePageId);

      setCurrentState((prevState) => {
        return computeComponentState(
          {
            ...prevState,
            page: {
              handle: dataDefinition.pages[homePageId]?.handle,
              name: dataDefinition.pages[homePageId]?.name,
              id: homePageId,
              variables: {},
            },
          },
          dataDefinition.pages[homePageId]?.components ?? {}
        );
      });

      runQueries(data.data_queries);
      setWindowTitle(data.name);
      setShowComments(!!queryString.parse(props.location.search).threadId);
      for (const event of dataDefinition.pages[homePageId]?.events ?? []) {
        await handleEvent(event.eventId, event);
      }

      initEditorWalkThrough();
    };

    setIsLoading(true);
    appService.getApp(appId).then(callBack);
  };

  const fetchOrgEnvironmentVariables = () => {
    orgEnvironmentVariableService.getVariables().then((data) => {
      const client_variables = {};
      const server_variables = {};
      data.variables.map((variable) => {
        if (variable.variable_type === 'server') {
          server_variables[variable.variable_name] = 'HiddenEnvironmentVariable';
        } else {
          client_variables[variable.variable_name] = variable.value;
        }
      });

      setCurrentState((currentState) => ({
        ...currentState,
        server: server_variables,
        client: client_variables,
      }));
    });
  };

  const globalSettingsChanged = (key, value) => {
    setIsSaving(true);
    setAppDefinition((appDefinition) => {
      const appDefinitionClone = { ...appDefinition };
      if (value?.[1]?.a == undefined) appDefinitionClone.globalSettings[key] = value;
      else {
        const hexCode = `${value?.[0]}${decimalToHex(value?.[1]?.a)}`;
        appDefinitionClone.globalSettings[key] = hexCode;
      }

      return appDefinitionClone;
    });

    autoSave();
  };

  const toggleAppMaintenance = () => {};

  const handleUndo = () => {
    let curVersion = 0;
    setCanUndo((canUndo) => {
      if (canUndo) {
        setCurrentVersion((currentVersion) => {
          curVersion = currentVersion[currentPageId];
          const newAppDefinition = applyPatches(
            appDefinition,
            currentVersionChanges[currentPageId][curVersion - 1].undo
          );

          setCanRedo(true);
          currentVersion[currentPageId] = curVersion - 1;
          if (newAppDefinition) {
            setAppDefinition(newAppDefinition);
            setIsSaving(true);
            autoSave();
          }
        });
      }

      return currentVersionChanges[currentPageId].hasOwnProperty(curVersion - 1);
    });
  };

  const handleRedo = () => {
    let curVersion = 0;
    setCanRedo((canRedo) => {
      if (canRedo) {
        setCurrentVersion((currentVersion) => {
          curVersion = currentVersion[currentPageId];
          const newAppDefinition = applyPatches(appDefinition, currentVersionChanges[currentPageId][curVersion].redo);

          setCanUndo(true);
          curVersion[currentPageId] = currentVersion + 1;
          if (newAppDefinition) {
            setAppDefinition(newAppDefinition);
            setIsSaving(true);
            autoSave();
          }
        });
      }

      return currentVersionChanges[currentPageId].hasOwnProperty(currentVersion + 1);
    });
  };

  const toggleCurrentLayout = (selectedLayout) => {
    setCurrentLayout(selectedLayout);
  };

  const onNameChanged = (newName) => {
    setApp((app) => ({
      ...app,
      name: newName,
    }));

    setWindowTitle(newName);
  };

  const setAppDefinitionFromVersion = (version) => {
    appDefinitionChanged(defaults(version.definition, this.defaultDefinition), {
      skipAutoSave: true,
      skipYmapUpdate: true,
      versionChanged: true,
    });

    setEditingVersion(version);
    setIsSaving(false);
    saveEditingVersion();
    initComponentVersioning();
  };

  const closeCreateVersionModalPrompt = () => {
    setIsSaving(false);
    setShowCreateVersionModalPrompt(false);
  };

  const handleSlugChange = (newSlug) => {
    setSlug(newSlug);
  };

  const onVersionRelease = (versionId) => {
    setApp((app) => ({
      ...app,
      current_version_id: versionId,
    }));
  };

  useEffect(() => {
    autoSave();
    fetchApps(0);
    fetchApp(props.match.params.pageHandle);
    fetchOrgEnvironmentVariables();
    initComponentVersioning();
  }, []);

  return (
    <div className="editor wrapper">
      <ReactTooltip type="dark" effect="solid" eventOff="click" delayShow={250} />
      <EditorHeader
        darkMode={props.darkMode}
        currentState={currentState}
        currentLayout={currentLayout}
        globalSettingsChanged={globalSettingsChanged}
        appDefinition={appDefinition}
        toggleAppMaintenance={toggleAppMaintenance}
        editingVersion={editingVersion}
        showCreateVersionModalPrompt={showCreateVersionModalPrompt}
        app={app}
        appVersionPreviewLink={appVersionPreviewLink}
        slug={slug}
        appId={appId}
        canUndo={canUndo}
        canRedo={canRedo}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        toggleCurrentLayout={toggleCurrentLayout}
        isSaving={isSaving}
        saveError={saveError}
        isVersionReleased={isVersionReleased}
        onNameChanged={onNameChanged}
        setAppDefinitionFromVersion={setAppDefinitionFromVersion}
        closeCreateVersionModalPrompt={closeCreateVersionModalPrompt}
        handleSlugChange={handleSlugChange}
        onVersionRelease={onVersionRelease}
        saveEditingVersion={saveEditingVersion}
      />
      <EditorContextWrapper>
        <DndProvider backend={HTML5Backend}></DndProvider>
      </EditorContextWrapper>
    </div>
  );
};

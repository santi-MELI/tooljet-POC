import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { initEditorWalkThrough } from '@/_helpers/createWalkThrough';
import { defaults } from 'lodash';

import { appService } from '@/_services';

import { EditorContextWrapper } from './Context/EditorContextWrapper';
import EditorHeader from './EditorHeader';

const defaultDefinition = {
  showViewerNavigation: true,
  homePageId: 1,
  pages: {
    [1]: {
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
    canvasBackgroundColor: '#edeff5',
    backgroundFxQuery: '',
  },
};

const globalSettingsChanged = () => {};
const toggleAppMaintenance = () => {};
const isVersionReleased = () => {};
const saveEditingVersion = () => {};
const setAppDefinitionFromVersion = () => {};
const handleRedo = () => {};
const handleUndo = () => {};

export const Editor = () => {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showCreateVersionModalPrompt, setShowCreateVersionModalPrompt] = useState(false);
  const [currentLayout, toggleCurrentLayout] = useState('desktop');
  const [apps, setApps] = useState({});
  const [app, setApp] = useState({});
  const [currentState, setCurrentState] = useState({});

  const closeCreateVersionModalPrompt = () => {
    setIsSaving(false);
    setShowCreateVersionModalPrompt(false);
  };

  const setWindowTitle = (name) => {
    document.title = name ? `${name} - Tooljet` : `Untitled App - Tooljet`;
  };

  const onNameChanged = (newName) => {
    setApp((app) => ({ ...app, name: newName }));
    setWindowTitle(newName);
  };

  const onVersionRelease = (versionId) => {
    setApp((app) => ({ ...app, current_version_id: versionId }));
  };

  const fetchApps = async (page) => {
    const data = await appService.getAll(page);
    setApps(data.apps);
  };

  const fetchApp = async (startingPageHandle) => {
    const data = await appService.getApp(1);
    let dataDefinition = defaults(data.definition, defaultDefinition);

    const pages = Object.entries(dataDefinition.pages).map(([pageId, page]) => ({ id: pageId, ...page }));
    const startingPageId = pages.filter((page) => page.handle === startingPageHandle)[0]?.id;
    const homePageId = startingPageId ?? dataDefinition.homePageId;

    data.editingVersion = data.editing_version;
    data.appDefinition = dataDefinition;
    data.currentPageId = homePageId;

    setApp(data);
    setCurrentState((state) => ({
      ...state,
      page: {
        handle: dataDefinition.pages[homePageId]?.handle,
        name: dataDefinition.pages[homePageId]?.name,
        id: homePageId,
        variables: {},
      },
    }));

    setIsLoading(false);
    initEditorWalkThrough();
  };

  useEffect(() => {
    fetchApps(0);
    fetchApp(1);
    setWindowTitle();
  }, []);

  return (
    <div className="editor wrapper">
      <ReactTooltip type="dark" effect="solid" eventOff="click" delayShow={250} />
      <EditorContextWrapper>
        <EditorHeader
          app={app}
          currentState={currentState}
          currentLayout={currentLayout}
          canUndo={canUndo}
          canRedo={canRedo}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          toggleCurrentLayout={toggleCurrentLayout}
          onNameChanged={onNameChanged}
          globalSettingsChanged={globalSettingsChanged}
          appDefinition={defaultDefinition}
          editingVersion={app.editingVersion}
          toggleAppMaintenance={toggleAppMaintenance}
          isVersionReleased={isVersionReleased}
          onVersionRelease={onVersionRelease}
          saveEditingVersion={saveEditingVersion}
          setAppDefinitionFromVersion={setAppDefinitionFromVersion}
          showCreateVersionModalPrompt={showCreateVersionModalPrompt}
          closeCreateVersionModalPrompt={closeCreateVersionModalPrompt}
        />
        <DndProvider backend={HTML5Backend}>
          <div className="sub-section"></div>
        </DndProvider>
      </EditorContextWrapper>
    </div>
  );
};

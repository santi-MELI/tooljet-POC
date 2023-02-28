export const GET = {
  meta: { total_pages: 1, total_count: 1, folder_count: 0, current_page: 1 },
  apps: [
    {
      id: 'bb1b5e53-4816-4c78-b2ba-4f04bf34ff76',
      name: 'PRUEBA APP',
      slug: 'bb1b5e53-4816-4c78-b2ba-4f04bf34ff76',
      is_public: null,
      is_maintenance_on: false,
      icon: 'calendar',
      organization_id: '02e302dd-e3a4-4661-9cf7-4d569b8236e6',
      current_version_id: null,
      user_id: '0f523db7-14f6-479a-bb2e-56e900e5f507',
      created_at: '2023-02-27T16:34:57.633Z',
      updated_at: '2023-02-27T16:35:16.233Z',
      user: { first_name: 'prueba', last_name: null },
      app_group_permissions: [
        {
          id: '2623721f-a3cc-4db2-beb1-48ed3c8dbbb5',
          app_id: 'bb1b5e53-4816-4c78-b2ba-4f04bf34ff76',
          group_permission_id: '83f2b912-8929-4a9a-a31f-2d34ee95b31e',
          read: true,
          update: true,
          delete: true,
          hide_from_dashboard: false,
          created_at: '2023-02-27T16:34:57.632Z',
          updated_at: '2023-02-27T16:34:57.632Z',
        },
      ],
      editing_version: {
        id: 'dd623182-8081-463b-9edf-a1bc0913b519',
        name: 'v1',
        definition: {
          show_viewer_navigation: true,
          home_page_id: '613dc04e-7b0a-4369-ba54-7834cab80a57',
          pages: {
            '613dc04e-7b0a-4369-ba54-7834cab80a57': {
              components: {
                '4a79b379-1fea-449c-9cbd-275cec868bbd': {
                  component: {
                    properties: {
                      tabs: {
                        type: 'code',
                        display_name: 'Tabs',
                        validation: {
                          schema: {
                            type: 'array',
                            element: {
                              type: 'object',
                              object: { id: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] } },
                            },
                          },
                        },
                      },
                      default_tab: {
                        type: 'code',
                        display_name: 'Default tab',
                        validation: {
                          schema: { type: 'union', schemas: [{ type: 'string' }, { type: 'number' }] },
                        },
                      },
                      hide_tabs: {
                        type: 'toggle',
                        display_name: 'Hide Tabs',
                        validation: { schema: { type: 'boolean' } },
                      },
                      render_only_active_tab: {
                        type: 'toggle',
                        display_name: 'Render only active tab',
                        validation: { schema: { type: 'boolean' } },
                      },
                    },
                    general: {
                      tooltip: {
                        type: 'code',
                        display_name: 'Tooltip',
                        validation: { schema: { type: 'string' } },
                      },
                    },
                    others: {
                      show_on_desktop: { type: 'toggle', display_name: 'Show on desktop' },
                      show_on_mobile: { type: 'toggle', display_name: 'Show on mobile' },
                    },
                    events: { on_tab_switch: { display_name: 'On tab switch' } },
                    styles: {
                      highlight_color: {
                        type: 'color',
                        display_name: 'Highlight Color',
                        validation: { schema: { type: 'string' } },
                      },
                      visibility: {
                        type: 'toggle',
                        display_name: 'Visibility',
                        validation: { schema: { type: 'boolean' } },
                      },
                      disabled_state: {
                        type: 'toggle',
                        display_name: 'Disable',
                        validation: { schema: { type: 'boolean' } },
                      },
                      tab_width: {
                        type: 'select',
                        display_name: 'Tab width',
                        options: [
                          { name: 'Auto', value: 'auto' },
                          { name: 'Equally split', value: 'split' },
                        ],
                      },
                    },
                    validate: true,
                    general_styles: { box_shadow: { type: 'boxShadow', display_name: 'Box Shadow' } },
                    definition: {
                      others: { show_on_desktop: { value: '{{true}}' }, show_on_mobile: { value: '{{false}}' } },
                      events: [],
                      styles: {
                        highlight_color: { value: '' },
                        visibility: { value: '{{true}}' },
                        disabled_state: { value: '{{false}}' },
                        tab_width: { value: 'auto' },
                      },
                      general_styles: { box_shadow: { value: '0px 0px 0px 0px #00000040' } },
                      properties: {
                        tabs: {
                          value:
                            "{{[ \n\t\t{ title: 'Home', id: '0' }, \n\t\t{ title: 'Profile', id: '1' }, \n\t\t{ title: 'Settings', id: '2' } \n ]}}",
                        },
                        default_tab: { value: '0' },
                        hide_tabs: { value: false },
                        render_only_active_tab: { value: true },
                      },
                      general: {},
                      exposed_variables: {},
                    },
                    name: 'tabs1',
                    display_name: 'Tabs',
                    description: 'Tabs component',
                    default_size: { width: 30, height: 300 },
                    default_children: [
                      {
                        component_name: 'Image',
                        layout: { top: 60, left: 37, height: 100 },
                        tab: 0,
                        properties: ['source'],
                        default_value: {
                          source:
                            'https://uploads-ssl.webflow.com/6266634263b9179f76b2236e/62666392f32677b5cb2fb84b_logo.svg',
                        },
                      },
                      {
                        component_name: 'Text',
                        layout: { top: 100, left: 17, height: 50, width: 34 },
                        tab: 1,
                        properties: ['text'],
                        default_value: {
                          text: 'Open-source low-code framework to build & deploy internal tools within minutes.',
                        },
                      },
                      { component_name: 'Table', layout: { top: 0, left: 1, width: 42, height: 250 }, tab: 2 },
                    ],
                    component: 'Tabs',
                    actions: [
                      {
                        handle: 'setTab',
                        display_name: 'Set current tab',
                        params: [{ handle: 'id', display_name: 'Id' }],
                      },
                    ],
                    exposed_variables: { current_tab: '' },
                  },
                  layouts: { desktop: { top: 0, left: 0, width: 30, height: 300 } },
                  with_default_children: true,
                },
              },
              handle: 'home',
              name: 'Home',
            },
          },
          global_settings: {
            hide_header: false,
            app_in_maintenance: false,
            canvas_max_width: 1292,
            canvas_max_width_type: 'px',
            canvas_max_height: 2400,
            canvas_background_color: '#edeff5',
            background_fx_query: '',
          },
        },
        app_id: 'bb1b5e53-4816-4c78-b2ba-4f04bf34ff76',
        created_at: '2023-02-27T16:34:57.663Z',
        updated_at: '2023-02-27T20:55:50.767Z',
      },
    },
  ],
};

export const GET_ZERO = {
  name: 'Untitled app',
  organization_id: '02e302dd-e3a4-4661-9cf7-4d569b8236e6',
  user_id: '0f523db7-14f6-479a-bb2e-56e900e5f507',
  created_at: '2023-02-27T21:09:52.229Z',
  updated_at: '2023-02-27T21:09:52.229Z',
  id: '6a1ced49-000b-4fd9-9d45-a6b9c6bb6fca',
  is_public: null,
  is_maintenance_on: false,
};

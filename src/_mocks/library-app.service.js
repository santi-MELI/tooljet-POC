export const GET = {
  template_app_manifests: [
    {
      name: 'Customer dashboard',
      description:
        'Display the list of customers on a table and signups on a chart using data from a PostgreSQL database.',
      widgets: ['Table', 'Chart'],
      sources: [{ name: 'PostgreSQL', id: 'postgresql' }],
      id: 'customer-dashboard',
      category: 'sales',
    },
    {
      name: 'Google Cloud Storage Explorer',
      description: 'A file explorer template that lets you view, download, and upload files in any of your GCS bucket.',
      widgets: ['List view', 'File Picker', 'Dropdown', 'Modal'],
      sources: [{ name: 'GCS', id: 'gcs' }],
      id: 'gcs-file-explorer',
      category: 'product-management',
    },
    {
      name: 'GitHub contributors',
      description: 'Display the list of contributors of a GitHub repository and display profile details on selection.',
      widgets: ['Table'],
      sources: [{ name: 'REST API', id: 'restapi' }],
      id: 'github-contributors',
      category: 'product-management',
    },
    {
      name: 'GitHub star history tracker',
      description: 'Tracks the growth of stargazers in a GitHub repository over time.',
      widgets: ['Chart'],
      sources: [{ name: 'REST API', id: 'restapi' }],
      id: 'github-star-history-tracker',
      category: 'product-management',
    },
    {
      name: 'GitHub Star Ranking',
      description:
        'Display the list of repositories having equal or more stars as set the by the user, includes advance search filter like language and minimum forks.',
      widgets: ['Table'],
      sources: [{ name: 'REST API', id: 'restapi' }],
      id: 'github-star-ranking',
      category: 'product-management',
    },
    {
      name: 'Job Application Tracker',
      description:'A dashboard for performing CRUD operations in google sheets.',
      widgets: ['Table'],
      sources: [{ name: 'Google Sheets', id: 'googlesheets' }],
      id: 'job-application-tracker',
      category: 'operations',
    },
    {
      name: 'KPI Management Dashboard',
      description: 'A unified view of data that improves visibility into company health.',
      widgets: ['Chart', 'Statistics', 'Circular Progress Bar'],
      sources: [{ name: 'Airtable', id: 'airtable' }],
      id: 'kpi-management-dashboard',
      category: 'data-and-analytics',
    },
    {
      name: 'S3 File Explorer',
      description:
        'Display the list of all the buckets in your aws s3 and user can perform operations like reading, downloading, and uploading files to the selected bucket.',
      widgets: ['Table', 'File Picker'],
      sources: [{ name: 'AWS S3', id: 's3' }],
      id: 's3-file-explorer',
      category: 'product-management',
    },
    {
      name: 'Store catalogue management dashboard',
      description:
        'A dashboard for keeping track of all the store item, and perform operations like updating the status or adding more items.',
      widgets: ['Table', 'Modal'],
      sources: [{ name: 'Airtable', id: 'airtable' }],
      id: 'store-catalogue-management-dashboard',
      category: 'product-management',
    },
    {
      name: 'WhatsApp and SMS CRM',
      description: 'Get a 360 view of your customer data and send them personalised messages via SMS and WhatsApp',
      widgets: ['Table'],
      sources: [
        { name: 'Google Sheets', id: 'googlesheets' },
        { name: 'Twilio', id: 'twilio' },
      ],
      id: 'whatsapp-and-sms-crm',
      category: 'sales',
    },
  ],
};

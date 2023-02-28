import HttpClient from '@/_helpers/http-client';

const adapter = new HttpClient();

async function findAll(isRead = false) {
  return [];
}

function updateAll(isRead) {
  return adapter.patch(`/comment_notifications`, { isRead });
}

function update(id, isRead) {
  return adapter.patch(`/comment_notifications/${id}`, { isRead });
}

export const commentNotificationsService = {
  findAll,
  updateAll,
  update,
};

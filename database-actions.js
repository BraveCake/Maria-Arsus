async function getNotifications(client) {
    const result = await client.query(
      `SELECT * FROM "NotifySubscriptions"`); 
    return result;
}
function cancelNotification(client,id)
{
  client.query(
      `DELETE FROM "NotifySubscriptions" where id=${id}`); 
}
module.exports.getNotifications = getNotifications;
module.exports.cancelNotification = cancelNotification;
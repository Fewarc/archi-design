import { error } from "console";

class GoogleDriveService {
  googleAuth = require('google-auth-library').GoogleAuth;
  google = require('googleapis').google;
  apiKey = require('archi-drive.json');

  SCOPE = ['https://www.googleapis.com/auth/drive'];

  getAuthClient = async () => {
    const jwtClient = new this.google.auth.JWT(
      this.apiKey.client_email,
      null,
      this.apiKey.private_key,
      this.SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
  }

  createFolder = async () => {
    const {GoogleAuth} = require('google-auth-library');
  const {google} = require('googleapis');

  const auth = new GoogleAuth({
    credentials: this.apiKey,
    scopes: 'https://www.googleapis.com/auth/drive',
  });
  const service = google.drive({version: 'v3', auth});
  const fileMetadata = {
    name: 'Invoices',
    mimeType: 'application/vnd.google-apps.folder',
  };
  try {
    const file = await service.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
    console.log('Folder Id:', file.data.id);
    return file.data.id;
  } catch (error) {
    console.error(error)
  }
  }

}

export default GoogleDriveService;
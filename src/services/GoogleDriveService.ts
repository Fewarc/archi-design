class GoogleDriveService {
  googleAuth = require("google-auth-library").GoogleAuth;
  google = require("googleapis").google;
  apiKey = require("archi-drive.json");

  SCOPE = ["https://www.googleapis.com/auth/drive"];

  auth = new this.googleAuth({
    credentials: this.apiKey,
    scopes: "https://www.googleapis.com/auth/drive",
  });

  service = this.google.drive({ version: "v3", auth: this.auth });

  createFolder = async (name: string) => {
    const fileMetadata = {
      name,
      mimeType: "application/vnd.google-apps.folder",
    };
    try {
      const file = await this.service.files.create({
        resource: fileMetadata,
        fields: "id",
      });
      return file.data.id;
    } catch (error) {
      console.error(error);
    }
  };

  listAll = async () => {
    try {
      const files = await this.service.files.list();
      console.log(files.data.files);
    } catch (error) {
      console.error(error);
    }
  };

  
}

export default new GoogleDriveService();

import { IPluginApiRouter } from '@h4a/core/interface/plugin-interface';
import imageUploaderApiRouter from '@h4a/core/service/page-builder/image-uploader-api-router';
import imagesListApiRouter from '@h4a/core/service/page-builder/images-list-api-router';

const router: IPluginApiRouter = async (req, path) => {
    switch (path) {
        case 'pagebuilder/upload-image':
            // TODO: Check credentials for pagebuilder
            return imageUploaderApiRouter(req, path);
        case 'pagebuilder/list-images':
            // TODO: Check credentials for pagebuilder
            return imagesListApiRouter(req, path);
    }

    return null;
};

export default router;

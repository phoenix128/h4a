import { NextApiRequest } from 'next';
import { IPluginApiRouter } from '@h4a/core/interface/plugin-interface';
import { join } from 'path';
import mime from 'mime';
import { mkdir, writeFile } from 'fs/promises';
import { uuid } from 'uuidv4';

const imageUploaderApiRouter: IPluginApiRouter = async (
    req: NextApiRequest
) => {
    const formData = await (req as any).formData();
    const file = formData.get('file') as Blob | null;

    if (!file) {
        return [{ error: 'File blob is required.' }, { status: 400 }];
    }

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const uniqueSuffix = uuid();
        const filename = `${file.name.replace(
            /\.[^/.]+$/,
            ''
        )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;

        await writeFile(`${uploadDir}/${filename}`, buffer);

        return [
            {
                url: `/uploads/${filename}`,
            },
            { status: 200 },
        ];
    } catch (e) {
        return [{ error: 'Failed to upload file.' }, { status: 500 }];
    }
};

export default imageUploaderApiRouter;

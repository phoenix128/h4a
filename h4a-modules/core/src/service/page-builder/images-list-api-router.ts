import { IPluginApiRouter } from '@h4a/core/interface/plugin-interface';
import { NextApiRequest } from 'next';
import { join } from 'path';
import fs from 'fs';

const imagesListApiRouter: IPluginApiRouter = async (req: NextApiRequest) => {
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    // List images in uploadDir
    const images = fs.readdirSync(uploadDir).map((file) => {
        return `/uploads/${file}`;
    });

    const res: any[] = images.reduce((acc, cur) => {
        const name = cur.split('/').pop();

        acc.push({ url: cur, name });
        return acc;
    }, [] as any[]);

    return [res, { status: 200 }];
};

export default imagesListApiRouter;

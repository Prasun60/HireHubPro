import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
const projectId = "2NKrBI1kOXqIoQI9AKldOjK6eqI";
const projectSecret = "ec1c887351c1c0c40a9ad2b9cab08ded";

const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
    host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
        authorization: auth,
    },
})

export const UploadToIPFS = async (file) => {

    const result = await ipfs.add(file);
    if (result.path) {
        const hash = result.path;
        return { success: true, data: { hash } };

    }
    else {
        return { success: false, data: {} }
    }

};

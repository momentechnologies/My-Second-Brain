import multer from 'multer';

export default multer({
    limits: {
        fileSize: 1024 * 1024 * 1024, // 1 GB
    },
});

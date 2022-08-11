export default {
    storage: process.env.CONFIG_IMAGE_STORAGE || 'local',
    hotBucket: process.env.CONFIG_HOT_BUCKET_NAME || 'mysecondbrain-files',
    coldBucket: process.env.CONFIG_COLD_BUCKET_NAME || 'mysecondbrain-files',
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generatedCommentId = createIdGenerator();
const generatePhotoId = createIdGenerator();
const generatePictureId = createIdGenerator();

export{generatedCommentId, generatePhotoId, generatePictureId};

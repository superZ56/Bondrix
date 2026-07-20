// Methodes d ouverture de Windows Explorer

// Folder Images ( Avatar )

export const openImagesFolder = () => {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        resolve(file);
      } else {
        resolve(null);
      }
    };
    input.click();
  });
};
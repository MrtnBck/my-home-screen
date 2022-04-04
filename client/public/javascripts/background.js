const bg = document.querySelector('.bg');

const searchTerm = 'mountain';

const getWallpaper = async () => {
  try {
    //prettier-ignore
    //PORT hardcoded, not an issue in production?
    const response = await axios.get(`http://localhost:8000/wallpaper/${searchTerm}`);
    //console.log(response.data.urls);
    bg.style.backgroundImage = `url('${response.data.urls.full}')`;
  } catch (err) {
    console.log(err);
  }
};

getWallpaper();

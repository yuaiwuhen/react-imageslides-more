export default function resizeImage(imageWidth, imageHeight) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    if (imageWidth / imageHeight > screenWidth / screenHeight) {
        return {
            width: screenWidth,
            height: (screenWidth * imageHeight) / imageWidth
        }
    } else {
        return {
            width: (imageWidth * screenHeight) / imageHeight,
            height: screenHeight
    }
    }
}

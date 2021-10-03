
export default function useImage() {
    //replace the ratio to minimize the image quality
    return image => image ? image.replace(/\._V1.+jpg/, '._V1_UX128_CR0,3,128,176_AL_.jpg') : image
}
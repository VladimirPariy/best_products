export const addPhotoToProduct = () => {
	let arr = []
	for (let i = 1; i <= 200; i++) {
		for(let k = 0; k<7; k++){
			arr.push({image_id:`${i}${k}`, product:i, image_title:`head-phone${k}.png`})
		}
	}
	return arr;
}



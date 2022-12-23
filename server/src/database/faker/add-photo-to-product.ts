export const addPhotoToProduct = () => {
	let arr = []
	for (let i = 1; i <= 200; i++) {
		arr.push({image_id: +`${i}0`, product: i, image_title: 'head-phone0.png'})
		arr.push({image_id: +`${i}1`, product: i, image_title: 'head-phone1.png'})
		arr.push({image_id: +`${i}2`, product: i, image_title: 'head-phone2.png'})
		arr.push({image_id: +`${i}3`, product: i, image_title: 'head-phone3.png'})
		arr.push({image_id: +`${i}4`, product: i, image_title: 'head-phone4.png'})
		arr.push({image_id: +`${i}5`, product: i, image_title: 'head-phone5.png'})
		arr.push({image_id: +`${i}6`, product: i, image_title: 'head-phone6.png'})
		
	}
	return arr;
}


// head-phone.png
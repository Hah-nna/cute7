

export const toggle = () => {
	let container = document.getElementById('container')
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}


export const addsign = () => {
  console.log("addsign")
  setTimeout(() => {
	let container = document.getElementById('container')
	container.classList.add('sign-in')

  }, 200);	
}
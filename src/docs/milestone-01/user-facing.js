const doc = document.getElementById('temp-doc')
const counter = document.getElementById('word-count')


doc.value= 'Welcome to our first prototype. Feel free to type, you can view the word count at the bottom of the page. We will add more features later '

function wordcount()
{
    let text = doc.value
    text = text.replace(/\s\s+/g, ' ')
    let len = text.substring(0,text.length-1).split(' ').length
    counter.innerHTML =`Word Count: ${len}`

}

wordcount()
document.addEventListener('keypress',wordcount)
document.addEventListener('keyup',wordcount)
document.addEventListener('keydown',wordcount)


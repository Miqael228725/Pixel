let info = document.querySelector('.info')
let btn_start = document.querySelector('.btn')
let field = document.querySelector('.field')
let main = document.querySelector('.main')
let tools_color = document.querySelectorAll('.color')
let fill = document.querySelector('.fill')
let save = document.querySelector('.save')
let eraser = document.querySelector('.eraser')
let def_color = getComputedStyle(document.documentElement).getPropertyValue('--default');
let cur_color = getComputedStyle(document.documentElement).getPropertyValue('--cur-color');
let mult_color = document.querySelector('.multy_color')
btn_start.addEventListener('click', function(){
    main.style.opacity = '1'
    anime({
        targets: '.info',
        translateY: '610px',
        duration: 500,
        easing: 'linear'
    }).finished.then(function(){
       info.style.display = 'none' 
       
       
    })

})

for (let i=0; i < 450; i += 1){
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id', `${i}`)
    field.appendChild(cell)
    
}


tools_color.forEach(color=>{
    color.addEventListener('click', function(){
        cur_color = getComputedStyle(color).backgroundColor;
        document.querySelector('.isActive').classList.remove('isActive');
        color.classList.add('isActive')

    })
})


let flag_mouse_down = false

document.addEventListener('mousedown', function(){
    flag_mouse_down = true
})

document.addEventListener('mouseup', function(){
    flag_mouse_down = false
})

eraser.addEventListener('click', function(){
    cur_color = def_color
    document.querySelector('.isActive').classList.remove('isActive')
    eraser.classList.add('isActive')
    flag_fill_on = false
})


let cell_list = document.querySelectorAll('.cell')

cell_list.forEach(i=>{
    i.addEventListener('mousedown', function(){
        if (flag_fill_on){
            let cell_id = parseInt(i.getAttribute('id'))
            anime({
                targets: '.cell',
                duration: 1000,
                backgroundColor: cur_color,
                easing: 'linear',
                delay: anime.stagger(50, {grid:[30, 15], from:cell_id})
                
            })
        
        }
    })
    i.addEventListener('mouseover', function(){
        if (flag_mouse_down){
            anime({
                targets: i,
                backgroundColor: cur_color,
                duration: 300,
                easing: 'linear'

            })
        }
    })
})

let fill_click_score = 0

let flag_fill_on = false
fill.addEventListener('click', function(){
    flag_fill_on = true
    if (+fill_click_score%2 == 0){
        fill.classList.add('isActive')
        fill_click_score += 1}
    else{
        fill_click_score += 1
        flag_fill_on = false
        fill.classList.remove('isActive')
    }
    }
)


mult_color.addEventListener('input', ()=>{
    cur_color = mult_color.value
    
})

save.addEventListener('click', ()=>{
    let p = []
    cell_list.forEach(i=>{
        p.push(i.style.backgroundColor || def_color)
    })
    localStorage.setItem('p', JSON.stringify(p))
    
})
window.addEventListener('load', ()=>{
    let img = localStorage.getItem('p')
    if (img){
        let img_array = JSON.parse(img)
        cell_list.forEach((cell, index)=>{
            cell.style.backgroundColor = img_array[index]
        })
    }
})
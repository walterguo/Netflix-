const initialstate={
    'mylist' : [
    {
    'title': 'Futurama',
    'id': 1,
    'img': 'http://cdn1.nflximg.net/webp/7621/3787621.webp'
    },
    {
    'title': 'The Interview',
    'id': 2,
    'img': 'http://cdn1.nflximg.net/webp/1381/11971381.webp'
    },
    {
    'title': 'Gilmore Girls',
    'id': 3,
    'img': 'http://cdn1.nflximg.net/webp/7451/11317451.webp'
    }
    ],
    'recommendations' : [
    {
    'title': 'Family Guy',
    'id': 4,
    'img': 'http://cdn5.nflximg.net/webp/5815/2515815.webp'
    },
    {
    'title': 'The Croods',
    'id': 5,
    'img': 'http://cdn3.nflximg.net/webp/2353/3862353.webp'
    },
    {
    'title': 'Friends',
    'id': 6,
    'img': 'http://cdn0.nflximg.net/webp/3200/9163200.webp'
    }
    ]
}

const reducer = (state=initialstate,action) => {
    switch (action.type) {
       case 'add':
       let tempstate={...state};
       for(let i=0;i<tempstate['recommendations'].length;i++){
           if(tempstate['recommendations'][i].id===action.id){
               tempstate['mylist'].push(tempstate['recommendations'][i]);
               tempstate['recommendations'].splice(i,1);
               break;
           }
       }
       return {
           'mylist':tempstate['mylist'].slice(),
           'recommendations':tempstate['recommendations'].slice()
       };

       case 'remove':
       tempstate={...state};
       for(let i=0;i<tempstate['mylist'].length;i++){
        if(tempstate['mylist'][i].id===action.id){
           tempstate['mylist'].splice(i,1);
            break;
        }
       }
        return {
        'mylist':tempstate['mylist'].slice(),
        'recommendations':tempstate['recommendations'].slice()
        };
      default: return state;
      }
}

export default reducer;
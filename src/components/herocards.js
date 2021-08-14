import React,{useState} from 'react'
import '../css/home.css'
import Google from '../Assets/GOOGL.png'
import FB from '../Assets/FB.png'
import AMZ from '../Assets/AMZN.svg'

export default function HeroCards() {

    const [id,setId] = useState(parseInt(0))
    const [cards,setCards] = useState([
        {
            id: 1,
            name: 'GOOGLE',
            img: Google,
            price:'3651',
            order:1,
        },
        {
            id: 2,
            name:'FB',
            img: FB,
            price:'259',
            order:2,
        },
        {
            id: 3,
            name:'AMAZON',
            img: AMZ,
            price:'1711',
            order:3,
        }
    ])

    const handleDrag = (event) => {
        setId(event.currentTarget.id);
      };
    
      const handleDrop = (e) => {
        const dragCard = cards.find((card) => card.id == id);
        const dropCard = cards.find((card) => card.id == e.currentTarget.id);
        // console.log(dropCard)
        const dragOrder = dragCard.order;
        const dropOrder = dropCard.order;
    
        const newCards = cards.map((card) => {
          if (card.id == e.currentTarget.id) {
            card.order = dragOrder;
          }
          if (card.id == id) {
            card.order = dropOrder;
          }
          return card;
        });
    
        setCards(newCards);
      };

   return(
    <div className="main-container">
        {cards.sort((a, b) => a.order - b.order).map((card)=>(
            <div draggable={true} id={card.id} key={card.id}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={(e)=>handleDrag(e)}
                onDrop={(e)=>handleDrop(e)}>

                    <div className="main-card pointer-move">
                        <div className="sub-card">
                        <p>{card.name}</p>
                        <img className="image" src={card.img} alt=''/>
                        </div>
                        <div className="total">
                            <p>{card.price} USD</p>
                        </div>
                    </div>

            </div>
            
        ))}
</div>
   )
}
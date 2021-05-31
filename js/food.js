class Food
{
    constructor()
    {
        this.foodStock = 0;
        this.image = loadImage("images/Milk.png")
        this.lastFed;
    }

     updateFoodStock(foodStock)
     {
         this.foodStock = foodStock;
     }

     getFedTime(lastFed)
     {
         this.lastFed = lastFed;
     }

     deductFood()
     {
         if(this.foodStock > 0)
         {
             this.foodStock = this.foodStock - 1;
         }
     }

    getFoodStock()
    {
      return this.foodStock;
    }

    
    display()
    {

        textSize(15)
  fill("white")
  if(lastFed >= 12)
  {
    text("Last Feed : " + lastFed % 12 + " PM", 50, 65)
  }

  else if(lastFed === 0)
  {
    text("Last Feed : 12 AM", 50, 65)
  }

  else
  {
    text("Last Feed : " + lastFed + " AM", 50, 65)
  }

        var x = 80, y = 200;

        imageMode(CENTER)
        image(this.image , 220, 760, 40, 40)

        if(this.foodStock != 0)
        {
            for(var i = 0; i < this.foodStock; i++)
            {
                if(i % 10 === 0)
                {
                x = 80;
                y = y + 100;
                }
                image(this.image, x, y, 100, 100)
                x = x + 50;

                
            }
        }
        
        textSize(20)
        fill("black")
        text("Milk Bottels Remaining : " + this.foodStock, 250, 770)
    }

    bedroom()
    {
        background(Bedroom, 700, 350)
    }

    garden()
    {
        background(Garden, 700, 350)
    }

    washroom()
    {
        background(Washroom, 700, 350)
    }

    livingroom()
    {
        background(Livingroom, 700, 350)
    }

}
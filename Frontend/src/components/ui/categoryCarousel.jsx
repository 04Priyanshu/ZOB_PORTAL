import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'
import { Button } from './button'

const category = [
    "Personal Loan",
    "Business Loan",
    "Home Loan",
    "Education Loan",
    "Car Loan",
]

function categoryCarousel() {
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((cat, index) => (
                        <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                            <Button variant="outline" className="rounded-full">{cat}</Button>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious className="text-[#F83002]"/>
            <CarouselNext className="text-[#F83002]"/>
        </Carousel>

    </div>
  )
}

export default categoryCarousel
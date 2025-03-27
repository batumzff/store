'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/lib/features/cartSlice'
import { Product } from '@/lib/services/api'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export default function ProductCard({ id, name, price, image, description }: ProductCardProps) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    const product: Product = {
      id: parseInt(id),
      title: name,
      price,
      description,
      image,
      category: '',
      rating: { rate: 0, count: 0 }, 
    }
    dispatch(addToCart(product))
  }

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <CardHeader>
          <CardTitle className="line-clamp-2">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          <p className="mt-2 text-lg font-semibold">${price}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  )
} 
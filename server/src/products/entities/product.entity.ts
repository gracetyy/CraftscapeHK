// Fix: Defined a Product class for data structure and typing.

/**
 * This class represents the Product data structure.
 * In a real application with a database, this would be a TypeORM or Prisma entity
 * with decorators for columns, relations, etc. For this mock implementation,
 * it serves as a plain class for type safety.
 */
export class Product {
  id: number;
  name: string;
  price: number;
  priceDisplay: string;
  priceSubDisplay?: string;
  image: string;
  artisan: string;
  full_description: string;
}


import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { MarketplaceProduct, Cart, CartItem } from '@/types/marketplace';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cart: Cart;
  addToCart: (product: MarketplaceProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('marketplace-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('marketplace-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: MarketplaceProduct, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Product already in cart, update quantity
        newItems = [...prevCart.items];
        const newQuantity = newItems[existingItemIndex].quantity + quantity;
        
        // Check stock limit
        if (newQuantity > product.quantidadeEstoque) {
          toast({
            title: "Estoque insuficiente",
            description: `Apenas ${product.quantidadeEstoque} unidades disponíveis.`,
            variant: "destructive"
          });
          return prevCart;
        }

        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newQuantity,
          subtotal: newQuantity * product.preco
        };
      } else {
        // New product, add to cart
        if (quantity > product.quantidadeEstoque) {
          toast({
            title: "Estoque insuficiente",
            description: `Apenas ${product.quantidadeEstoque} unidades disponíveis.`,
            variant: "destructive"
          });
          return prevCart;
        }

        const newItem: CartItem = {
          product,
          quantity,
          subtotal: quantity * product.preco
        };
        newItems = [...prevCart.items, newItem];
      }

      const total = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      toast({
        title: "Produto adicionado",
        description: `${product.nome} foi adicionado ao carrinho.`,
      });

      return {
        items: newItems,
        total,
        itemCount
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      const total = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      toast({
        title: "Produto removido",
        description: "Item removido do carrinho.",
      });

      return {
        items: newItems,
        total,
        itemCount
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => {
        if (item.product.id === productId) {
          if (quantity > item.product.quantidadeEstoque) {
            toast({
              title: "Estoque insuficiente",
              description: `Apenas ${item.product.quantidadeEstoque} unidades disponíveis.`,
              variant: "destructive"
            });
            return item;
          }
          
          return {
            ...item,
            quantity,
            subtotal: quantity * item.product.preco
          };
        }
        return item;
      });

      const total = newItems.reduce((sum, item) => sum + item.subtotal, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total,
        itemCount
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0
    });
    
    toast({
      title: "Carrinho limpo",
      description: "Todos os itens foram removidos do carrinho.",
    });
  };

  const getCartTotal = () => cart.total;
  const getCartItemCount = () => cart.itemCount;

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

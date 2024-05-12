import * as z from "zod";

export const Chair = z
    .object({
        _id: z.string(),
        name: z.string(),
        length: z.number(),
        width: z.number(),
        image: z.string().array()
    })
    .strict();
export const Table = z
    .object({
        _id: z.string(),
        name: z.string(),
        length: z.number(),
        width: z.number(),
        image: z.string().array()
    })
    .strict();

export const Arrangement = z
    .object({
        _id: z.string(),
        name: z.string(),
        chairspertable: z.number(),
    })
    .strict();

export const Address = z.object({
    id: z.string(),
    fname: z.string(),
    lname: z.string(),
    country: z.string(),
    phone: z.string(),
    line_1: z.string(),
    line_2: z.string(),
    primary: z.boolean(),
    city: z.string(),
    postal_code: z.string(),
    userId: z.string().nullable(),
}).strict();

export const Delivery = z.object({
    id: z.string(),
    email: z.string(),
    phone: z.string(),
    addressId: z.string().nullable(),
    address: Address,
    service: z.string(),
    message: z.string(),
    gift: z.boolean(),
    wrapped: z.boolean(),
    boxed: z.boolean(),
}).strict();

export const Pickup = z.object({
    id: z.string(),
    fname: z.string(),
    lname: z.string(),
    email: z.string(),
    phone: z.string(),
    store: z.string(),
    message: z.string(),
    gift: z.boolean(),
    wrapped: z.boolean(),
    boxed: z.boolean(),
}).strict();


export const CartItem = z.object(
    {
        name: z.string(),
        color: z.string(),
        size: z.string(),
        count: z.number(),
        price: z.number(),
    }
);

export const Order = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    delivery: Delivery.nullable(),
    pickup: Pickup.nullable(),
    payment_status: z.enum(["PENDING", "PAID"]),
    payment_method: z.enum(["CREDIT_CARD", "COD"]).nullable(),
    shipping_method: z.enum(["DELIVERY", "PICKUP"]).nullable(),
    delivery_status: z.enum(["IDLE", "PROCESSING", "DISPATCHED", "DELIVERED"]).nullable(),
    order_status: z.enum(["PENDING", "FULFILLED", "REJECTED"]),
    orderItems: CartItem.array(),
    deliveryId: z.string().nullable(),
    pickupId: z.string().nullable(),
});

// export const NewOrder = z.object({
//   id: z.string(),
//   userId: z.string().nullable(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
//   delivery: Delivery.nullable(),
//   pickup: Pickup.nullable(),
//   payment_status: z.enum(["PENDING", "PAID"]),
//   payment_method: z.enum(["CREDIT_CARD", "COD"]).nullable(),
//   shipping_method: z.enum(["DELIVERY", "PICKUP"]).nullable(),
//   delivery_status: z.enum(["IDLE", "PROCESSING", "DISPATCHED", "DELIVERED"]).nullable(),
//   order_status: z.enum(["PENDING", "FULFILLED", "REJECTED"]),
//   orderItems: CartItem.array(),
//   deliveryId: z.string().nullable(),
//   pickupId: z.string().nullable(),
//   fullName: z.string(),
// });


export const NewOrder = z.object({
    id: z.string(),
    delivery: z.object({
        address: z.object({
            fname: z.string(),
            lname: z.string(),
        }).strict(),
    }).strict().nullable(),
    pickup: z.object({
        fname: z.string(),
        lname: z.string(),
    }).strict().nullable(),
    payment_status: z.enum(["PENDING", "PAID"]),
    shipping_method: z.enum(["DELIVERY", "PICKUP"]).nullable(),
    order_status: z.enum(["PENDING", "FULFILLED", "REJECTED"]),
    orderItems: z.object(
        {
            count: z.number(),
            price: z.number(),
        }
    ).array(),
    fullName: z.string(),
});

export const OrderStatus = z.enum(["PENDING", "FULFILLED", "REJECTED"]);
export const PaymentStatus = z.enum(["PENDING", "PAID"]);
export const DeliveryStatus = z.enum(["IDLE", "PROCESSING", "DISPATCHED", "DELIVERED"]);
export const ShippingMethod = z.enum(["DELIVERY", "PICKUP"]);

export const ClothArray = Chair.array();
export const OrderArray = Order.array();
export const NewOrderArray = NewOrder.array();
export const CartItemArray = CartItem.array();


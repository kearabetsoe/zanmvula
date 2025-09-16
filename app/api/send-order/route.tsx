import { type NextRequest, NextResponse } from "next/server";

interface CartItem {
  id: string;
  productId: number;
  productName: string;
  component: "waistcoat" | "pants" | "full";
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface OrderData {
  cart: CartItem[];
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    chest: string;
    waist: string;
    hips: string;
    shoulders: string;
    sleeves: string;
    inseam: string;
    specialRequests: string;
  };
  orderReference: string;
  total: number;
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();

    // Create email content
    const emailContent = createOrderEmailContent(orderData);

    // In a real application, you would use an email service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES

    // For now, we'll simulate sending the email
    console.log("Order email would be sent to: kgntamane@gmail.com");
    console.log("Email content:", emailContent);

    // Here you would integrate with your preferred email service
    // Example with Resend:

    const { Resend } = require("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kgntamane@gmail.com",
      subject: `New Order - ${orderData.orderReference}`,
      html: emailContent,
    });

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully",
      orderReference: orderData.orderReference,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process order" },
      { status: 500 }
    );
  }
}

function createOrderEmailContent(orderData: OrderData): string {
  const { cart, formData, orderReference, total } = orderData;

  const getComponentDisplayName = (component: string) => {
    switch (component) {
      case "waistcoat":
        return "Waistcoat Only";
      case "pants":
        return "Pants Only";
      case "full":
        return "2 Piece Set";
      default:
        return "2 Piece Set";
    }
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order - ${orderReference}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .order-info { background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .item { border-bottom: 1px solid #eee; padding: 10px 0; }
        .item:last-child { border-bottom: none; }
        .total { font-size: 18px; font-weight: bold; color: #8B4513; }
        .measurements { background-color: #fff8dc; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .section-title { color: #8B4513; font-weight: bold; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎯 New Order Received - Zanemvula</h1>
        <p>Order Reference: ${orderReference}</p>
      </div>
      
      <div class="content">
        <div class="order-info">
          <h2 class="section-title">📋 Order Details</h2>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          <p><strong>Order Reference:</strong> ${orderReference}</p>
        </div>
        
        <h2 class="section-title">👤 Customer Information</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        
        <h2 class="section-title">📍 Delivery Address</h2>
        <p>${formData.street}</p>
        <p>${formData.city}, ${formData.state} ${formData.zipCode}</p>
        <p>${formData.country}</p>
        
        <h2 class="section-title">🛍️ Order Items</h2>
        ${cart
          .map(
            (item) => `
          <div class="item">
            <p><strong>${item.productName}</strong></p>
            <p>Item: ${getComponentDisplayName(item.component)}</p>
            <p>Size: ${item.size}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: R${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        `
          )
          .join("")}
        
        <div class="total">
          <p>Total Order Value: R${total.toFixed(2)}</p>
        </div>
        
        <div class="measurements">
          <h2 class="section-title">📏 Custom Measurements</h2>
          ${
            formData.chest
              ? `<p><strong>Chest/Bust:</strong> ${formData.chest} centimeters</p>`
              : ""
          }
          ${
            formData.waist
              ? `<p><strong>Waist:</strong> ${formData.waist} centimeters</p>`
              : ""
          }
          ${
            formData.hips
              ? `<p><strong>Hips:</strong> ${formData.hips} centimeters</p>`
              : ""
          }
          ${
            formData.shoulders
              ? `<p><strong>Shoulder Width:</strong> ${formData.shoulders} centimeters</p>`
              : ""
          }
          ${
            formData.sleeves
              ? `<p><strong>Arm Length:</strong> ${formData.sleeves} centimeters</p>`
              : ""
          }
          ${
            formData.inseam
              ? `<p><strong>Inseam Length:</strong> ${formData.inseam} centimeters</p>`
              : ""
          }
          ${
            !formData.chest &&
            !formData.waist &&
            !formData.hips &&
            !formData.shoulders &&
            !formData.sleeves &&
            !formData.inseam
              ? "<p><em>No measurements provided - consultation required</em></p>"
              : ""
          }
        </div>
        
        ${
          formData.specialRequests
            ? `
          <h2 class="section-title">✨ Special Requests & Traditional Styling</h2>
          <div class="measurements">
            <p>${formData.specialRequests}</p>
          </div>
        `
            : ""
        }
        
        <div class="order-info">
          <h2 class="section-title">📞 Next Steps</h2>
          <p>• Contact customer within 24 hours</p>
          <p>• Schedule measurement consultation if needed</p>
          <p>• Discuss traditional styling preferences</p>
          <p>• Confirm delivery timeline</p>
          <p>• Process payment arrangements</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

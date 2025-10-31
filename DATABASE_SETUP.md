# Database Setup Guide

## 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `MONGODB_URI` in `.env.local`

## 2. Cloudinary Setup (for images)

1. Go to [Cloudinary](https://cloudinary.com)
2. Create a free account
3. Get your cloud name, API key, and API secret
4. Replace the Cloudinary variables in `.env.local`

## 3. Environment Variables

Update `.env.local` with your actual values:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/damzz-beauty
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
JWT_SECRET=your-super-secret-key
ADMIN_EMAIL=admin@damzzbeauty.com
ADMIN_PASSWORD=your-secure-password
```

## 4. Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other platforms
- Netlify
- Railway
- Heroku

## 5. Features

✅ **Product Management** - Add/edit/delete products with images
✅ **Booking System** - Real appointment booking
✅ **Image Upload** - Cloudinary integration
✅ **Database Storage** - MongoDB for all data
✅ **Admin Panel** - Manage everything easily

## 6. Admin Access

Visit `/admin` to manage products and view bookings.
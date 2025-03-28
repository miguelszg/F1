import process from 'process';
import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import nodemailer from 'nodemailer';


const MONGO_URI = 'mongodb+srv://mike:123@f1.4qx3rrg.mongodb.net/?retryWrites=true&w=majority&appName=F1';
const JWT_SECRET = 'holaaaa123';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'ms462974@gmail.com', 
      pass: 'xsuh uqqj ohpi dvxs' 
  }
});

async function connectToMongo() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('✅ MongoDB connected successfully');
    return client;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    const mongoClient = await connectToMongo();
    const app = express();

    app.use(cors());
    app.use(express.json());

    const PORT = process.env.PORT || 5000;

    app.post('/api/login', async (req, res) => {
        const { correo, contraseña } = req.body;
    
        try {
            const user = await mongoClient.db().collection('users').findOne({ correo });
            if (!user) {
                return res.status(400).json({ error: 'Usuario no encontrado' });
            }
    
            const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
            if (!passwordMatch) {
                return res.status(400).json({ error: 'Contraseña incorrecta' });
            }
            const secret = speakeasy.generateSecret({ name: 'MyApp' });
            
            await mongoClient.db().collection('users').updateOne(
                { correo },
                { $set: { mfaSecret: secret.base32 } } 
            );
    
            const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);
    
            return res.status(200).json({ message: 'Configura MFA', qrCodeUrl });
        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    });
    

    // 📌 API para solicitar recuperación de contraseña
app.post('/api/forgot-password', async (req, res) => {
  const { correo } = req.body;
  try {
      const user = await mongoClient.db().collection('users').findOne({ correo });
      if (!user) return res.status(400).json({ error: 'Correo no registrado' });

      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

      await mongoClient.db().collection('users').updateOne({ correo }, { $set: { resetCode } });

      await transporter.sendMail({
          from: 'tuemail@gmail.com',
          to: correo,
          subject: 'Código de recuperación de contraseña',
          text: `Tu código de recuperación es: ${resetCode}`
      });

      res.status(200).json({ message: 'Código enviado al correo' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error enviando el código' });
  }
});

// 📌 API para restablecer la contraseña
app.post('/api/reset-password', async (req, res) => {
  const { correo, resetCode, nuevaContraseña } = req.body;

  try {
      const user = await mongoClient.db().collection('users').findOne({ correo });

      if (!user || user.resetCode !== resetCode) {
          return res.status(400).json({ error: 'Código incorrecto o expirado' });
      }

      const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

      await mongoClient.db().collection('users').updateOne(
          { correo },
          { $set: { contraseña: hashedPassword }, $unset: { resetCode: 1 } }
      );

      res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la contraseña' });
  }
});

  app.post('/api/report', async (req, res) => {
    const { name, email, description } = req.body;

    if (!name || !email || !description) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const report = {
            name,
            email,
            description,
            createdAt: new Date()
        };
        await mongoClient.db().collection('reports').insertOne(report);

        await transporter.sendMail({
            from: 'ms462974@gmail.com',
            to: email,
            subject: 'Confirmación de reporte',
            text: `Hola ${name},\n\nHemos recibido tu reporte:\n"${description}"\n\nGracias por contactarnos.`,
        });

        res.status(200).json({ message: 'Reporte enviado y correo de confirmación enviado' });
    } catch (error) {
        console.error('Error al enviar el reporte:', error);
        res.status(500).json({ error: 'Error al procesar el reporte' });
    }
  });


    // 📌 API para verificar el código MFA
    app.post('/api/verify-mfa', async (req, res) => {
      const { correo, code } = req.body;
  
      try {
          const user = await mongoClient.db().collection('users').findOne({ correo });
          if (!user || !user.mfaSecret) {
              return res.status(400).json({ error: 'MFA no configurado o no disponible' });
          }
  
          const isValid = speakeasy.totp.verify({
              secret: user.mfaSecret,
              encoding: 'base32',
              token: code,
              window: 1,
          });
  
          if (!isValid) {
              return res.status(400).json({ error: 'Código MFA incorrecto' });
          }
  
          const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
          res.status(200).json({ message: 'Autenticación exitosa', token, userId: user._id });
      } catch (error) {
          res.status(500).json({ error: 'Error al verificar el código MFA' });
      }
  });
  // En tu servidor (server.js)
app.get('/api/carousel', async (req, res) => {
    try {
      const slides = await mongoClient.db().collection('carousel').find().limit(3).toArray();
      // Normalizamos los datos antes de enviarlos
      const normalizedSlides = slides.map(slide => ({
        ...slide,
        imageUrl: slide.image // Renombramos el campo
      }));
      res.status(200).json(normalizedSlides);
    } catch (error) {
      console.error('Error al obtener datos del carrusel:', error);
      res.status(500).json({ error: 'Error al obtener datos del carrusel' });
    }
  });

//NOticias carrucel principal
app.get('/api/articles/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }

        const article = await mongoClient.db().collection('carousel').findOne({ 
            _id: new ObjectId(id) 
        });

        if (!article) {
            return res.status(404).json({ message: 'Documento no encontrado en carousel' });
        }

        article.imageUrl = article.image; // Opcional: renombrar campo si es necesario
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el documento' });
    }
});

//Api-calendar
app.get('/api/calendar', async (req, res) => {
    try {
        const events = await mongoClient.db().collection('calendar').find().toArray();
        const normalizedEvents = events.map(event => ({
            ...event,
            imageUrl: event.imageUrl || '', // Aseguramos que siempre tenga una propiedad `imageUrl`
        }));
        res.json(normalizedEvents);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
    }
});

app.get('/api/calendar/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }

        const event = await mongoClient.db().collection('calendar').findOne({ _id: new ObjectId(id) });

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        event.imageUrl = event.imageUrl || ''; // Aseguramos que el campo `imageUrl` esté presente
        res.json(event);
    } catch (error) {
        console.error('Error al obtener el evento:', error);
        res.status(500).json({ message: 'Error al obtener el evento' });
    }
});



  

  app.get('/api/user/:userId', async (req, res) => {
    let { userId } = req.params;

    try {
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'ID de usuario no válido' });
        }

        const user = await mongoClient.db().collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener datos del usuario' });
    }
});

//actualizar los datos del usuario PUT
app.put('/api/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { nombre, descripcion } = req.body;

  try {
      if (!ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'ID de usuario no válido' });
      }

      const user = await mongoClient.db().collection('users').findOne({ _id: new ObjectId(userId) });
      if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      if (user.nombre === nombre && user.descripcion === descripcion) {
          return res.status(400).json({ error: 'No se realizaron cambios' });
      }

      const result = await mongoClient.db().collection('users').updateOne(
          { _id: new ObjectId(userId) },
          { $set: { nombre, descripcion } }
      );

      if (result.modifiedCount === 0) {
          return res.status(400).json({ error: 'No se realizaron cambios' });
      }

      res.status(200).json({ message: 'Perfil actualizado con éxito' });
  } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
});

//NEWS
app.get('/api/news', async (req, res) => {
    try {
        const newsList = await mongoClient.db().collection('news').find().toArray();
        res.status(200).json(newsList);
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
        res.status(500).json({ error: 'Error al obtener las noticias' });
    }
});

app.get('/api/news/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID no válido' });
        }

        const newsItem = await mongoClient.db().collection('news').findOne({ _id: new ObjectId(id) });

        if (!newsItem) {
            return res.status(404).json({ message: 'Noticia no encontrada' });
        }

        res.json(newsItem);
    } catch (error) {
        console.error('Error al obtener la noticia:', error);
        res.status(500).json({ message: 'Error al obtener la noticia' });
    }
});





    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('\n🔴 Closing MongoDB connection...');
      await mongoClient.close();
      process.exit(0);
    });

    return { app, mongoClient, server };
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export { connectToMongo, startServer };

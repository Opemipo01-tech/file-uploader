import { prisma } from "../db/prisma.js";
import bcrypt from "bcryptjs"
import path from "node:path";
 

async function getHome(req,res) {

    const folders = await prisma.folder.findMany({
        where:{
            userId:req.user.id,
        },
        orderBy:{
            createdAt:"desc",
        },
    });

    res.render("index",{
        folders
    })
}

async function getSignUp(req,res) {
    res.render("signup")
}

async function postSignUp(req,res) {
  const { firstname, lastname, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstname,
        lastname,
        username,
        password: hashedPassword,
      },
    });

    res.redirect("/log-in");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
}

async function getLogin(req,res) {
    res.render("login")
}

async function getLogout(req,res,next) {
     req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function getCreateFolder(req, res) {
  res.render("createFolder");
}

async function postCreateFolder(req, res) {
  const { folderName } = req.body;

  try {
    await prisma.folder.create({
      data: {
        name:folderName,
        userId: req.user.id,
      },
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create folder");
  }
}

async function getFolder(req,res) {
    const folderId = Number(req.params.id);

    try{
        const folder = await prisma.folder.findFirst({
          where: {
            id: folderId,
            userId: req.user.id,
          },
          include:{
            files:true,
          },  
        });

        if (!folder) {
            returnres.status(404).send("Folder not found");
        }

        res.render("folder",{
            folder,
        });
    } catch(error) {
        console.error(error);
        res.status(500).send("Unable to load folder");
    }
}

async function getRenameFolder(req, res) {
  const folderId = Number(req.params.id);

  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: req.user.id,
      },
    });

    if (!folder) {
      return res.status(404).send("Folder not found");
    }

    res.render("renameFolder", {
      folder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load folder");
  }
}

 async function postRenameFolder(req, res) {
  const folderId = Number(req.params.id);
  const { name } = req.body;

  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: req.user.id,
      },
    });

    if (!folder) {
      return res.status(404).send("Folder not found");
    }

    await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });

    res.redirect(`/folders/${folderId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to rename folder");
  }
}

 async function postDeleteFolder(req, res) {
  const folderId = Number(req.params.id);

  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: req.user.id,
      },
    });

    if (!folder) {
      return res.status(404).send("Folder not found");
    }

    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to delete folder");
  }
}

async function getCreateFile(req,res) {
    const folderId = Number(req.params.id);

    try{
        const folder = await prisma.folder.findFirst({
          where: {
            id: folderId,
            userId: req.user.id,
          },
          include:{
            files:true,
          },  
        });

        if (!folder) {
            returnres.status(404).send("Folder not found");
        }

        res.render("fileUpload",{
            folder,
        });
    } catch(error) {
        console.error(error);
        res.status(500).send("Unable to load upload page");
    }
}

async function postFileUpload(req,res) {
     const folderId = Number(req.params.id);

  try {
    // Make sure a file was actually uploaded
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Make sure the folder belongs to the logged-in user
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId: req.user.id,
      },
    });

    if (!folder) {
      return res.status(404).send("Folder not found");
    }

    // Create the file record in the database
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        url: req.file.path,
        folderId: folderId,
      },
    });

    res.redirect(`/folders/${folderId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to upload file");
  }
}

async function getFileDetails(req,res) {
    const fileId = Number(req.params.id);

    try{
  

    // Make sure the file belongs to the logged-in user
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        folder:{
            userId: req.user.id,
        }
      },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

    res.render("fileDetails",{
        file,
    });
     

    } catch(error) {
        console.error(error);
        res.status(500).send("Unable to get file details");
    }
      

}

async function downloadFile(req,res) {
        const fileId = Number(req.params.id);

    try{
  

    // Make sure the file belongs to the logged-in user
    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        folder:{
            userId: req.user.id,
        }
      },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

     const filePath = path.resolve(file.url);

     res.download(filePath,file.name,(error) => {
        if (error){
            console.error(error);
        }
     })
     

    } catch(error) {
        console.error(error);
        res.status(500).send("Unable to download file");
    }
}



export {getHome,getSignUp,getLogin,postSignUp,getLogout,getCreateFolder,postCreateFolder,getFolder,getRenameFolder,postRenameFolder,postDeleteFolder,getCreateFile,postFileUpload,getFileDetails,downloadFile};


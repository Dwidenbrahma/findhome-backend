import dotenv from "dotenv";
import jwtOwner from "jsonwebtoken";
dotenv.config();

const generateOwnerToken = (owner) => {
  return jwtOwner.sign(
    { owner_id: owner._id, email: owner.email },
    process.env.JWT_SECRET2,
    {
      expiresIn: "5h",
    }
  );
};

const verifyOwnerToken = (ownerToken) => {
  return jwtOwner.verify(ownerToken, process.env.JWT_SECRET2);
};

export { generateOwnerToken, verifyOwnerToken };

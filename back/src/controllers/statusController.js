export const getServerStatus = async (req, res) => {
  try {
    res.status(200).send({ message: "Server is running" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve server status" });
  }
};

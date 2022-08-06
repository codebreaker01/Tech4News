const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  res.redirect("/");
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://dailytech.pk/wp-json/wp/v2/posts/${id}`
    );
    const latestPostsResponse = await axios.get(
      "https://dailytech.pk/wp-json/wp/v2/posts?order=desc&&per_page=5"
    );
    const latestPosts = latestPostsResponse.data;
    const post = response.data;
    res.render("singlePost", {
      post: post,
      latestPosts: latestPosts,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

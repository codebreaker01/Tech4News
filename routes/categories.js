const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  res.redirect("/");
});

router.get("/:categoryName/:page", async (req, res) => {
  let name = req.params.categoryName;
  let page = parseInt(req.params.page);
  if(page<=0){
    page=1
  }
  let id;
  let category;
  if (name == "freelancing") {
    id = 3;
    category = "freelancing";
  } else if (name == "technology") {
    id = 5;
    category = "technology";
  }
  try {
    const categoryResponse = await axios.get(
      `https://dailytech.pk/wp-json/wp/v2/posts?categories=${id}&&order=desc&&per_page=5&&page=${page}`
    );
    const latestPostsResponse = await axios.get(
      "https://dailytech.pk/wp-json/wp/v2/posts?order=desc&&per_page=5"
    );
    const latestPosts = latestPostsResponse.data;
    const categoryPosts = categoryResponse.data;
    res.render("categories.ejs", {
      categoryPosts: categoryPosts,
      latestPosts: latestPosts,
      category: category,
      page:page
    });
    console.log(typeof(page));
  } catch (error) {
    res.send("No Posts Found");
  }
});

module.exports = router;

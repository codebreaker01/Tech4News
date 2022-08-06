const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const sliderResponse = await axios.get(
      "https://dailytech.pk/wp-json/wp/v2/posts?per_page=3&&order=desc"
    );
    const latestFreelancingResponse = await axios.get(
      "https://dailytech.pk/wp-json/wp/v2/posts?categories=5&&per_page=12&&order=desc"
    );
    const latestTechnologyResponse = await axios.get(
      "https://dailytech.pk/wp-json/wp/v2/posts?categories=3&&per_page=9&&order=desc"
    );
    const sliderPosts = sliderResponse.data;
    const latestFreelancingPosts = latestFreelancingResponse.data;
    const latestTechnologyPosts = latestTechnologyResponse.data;
    res.render("home", {
      sliderPosts: sliderPosts,
      latestFreelancingPosts: latestFreelancingPosts,
      latestTechnologyPosts: latestTechnologyPosts,
    });
  } catch (error) {
    res.send("Could Not Fetch Posts");
    console.log(error);
  }
});

module.exports = router;

const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const readFile = promisify(fs.readFile);
const router = express.Router();

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

router.post('/annotate', async (req, res) => {
  const { base64 } = req.body;
  console.log('base64:', base64.slice(0, 30));
  try {
    const response = await client.annotateImage({
      image: {
        content: Buffer.from(base64, 'base64')
      },
      features: [{
        type: 'WEB_DETECTION'
      }]
    });
    const resObj = response[0]
    if (resObj.error) {
      console.log('resObj.error:', resObj.error);
      return res.status(400).json(resObj.error);
    }
    console.log('response:', JSON.stringify(response, null, 4));
    console.log(resObj.webDetection.bestGuessLabels);
    resObj.webDetection.pagesWithMatchingImages.forEach(item => {
      if (item.url && typeof item.url === 'string' && item.url.includes('goodreads.com')) {
        console.log('Goodreads link:', item);
      }
    });
    res.status(200).json({
      moro: 'moro!!!!'
    });
  } catch (e) {
    console.log('e:', e.message);
    res.sendStatus(500);
  }
});

module.exports = router;
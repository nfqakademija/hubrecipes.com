<?php

namespace HubRecipes\YummlyClientBundle\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Query;
use HubRecipes\YummlyClientBundle\Model\RecipeModel;

class SearchService
{
    /**
     * @var Client
     */
    protected $client;
    /**
     * @var String
     */
    protected $appKey;

    /**
     * @var String
     */
    protected $appID;

    /**
     * @var String
     */
    protected $baseURL;


    /**
     * @param $client
     * @param $appKey
     * @param $appId
     * @param $baseURL
     */
    public function __construct($client, $appKey, $appId, $baseURL)
    {
        $this->baseURL = $baseURL;
        $this->client = $client;
        $this->appID = $appId;
        $this->appKey = $appKey;
    }


    /**
     * @return \GuzzleHttp\Message\RequestInterface
     */
    public function constructQuery(){
        $r = $this->client->createRequest('get', $this->baseURL . 'recipes');
        $query = $r->getQuery();
        $query->set('_app_id', $this->appID);
        $query->set('_app_key', $this->appKey);
        return $r;
    }


    /**
     * @param $string
     * @param $flavor
     * @param $query
     * @return mixed
     */
    function setFlavor($string, $flavor, $query){
        if ($flavor != ""){
            $query->set('flavor.'. $string .'.min',0);
            $query->set('flavor.'. $string .'.max',$flavor);
        }
        return $query;
    }


    /**
     * @param $sour
     * @param $salty
     * @param $sweet
     * @param $spicy
     * @param $bitter
     * @param $savory
     * @param $time
     * @param $type
     * @param $allowedIngredients
     * @param $excludedIngredients
     * @param $start
     * @param $cuisine
     * @return mixed
     */
    public function getResults($sour,$salty,$sweet, $spicy, $bitter, $savory
        ,$time, $type, $allowedIngredients, $excludedIngredients, $start, $cuisine)
    {

        $r = $this->constructQuery();
        $query = $r->getQuery();

        $query->set('allowedIngredient', $allowedIngredients);

        $query->set('excludedIngredient', $excludedIngredients);

        if ($type != "-") {
            $query->set('allowedCourse', 'course^course-' . $type);
        }
        $query = $this->setFlavor('sour', $sour, $query);

        $query = $this->setFlavor('sweet', $sweet, $query);

        $query = $this->setFlavor('piquant', $spicy, $query);

        $query = $this->setFlavor('bitter', $bitter, $query);

        $query = $this->setFlavor('meaty', $savory, $query);

        $query = $this->setFlavor('salty', $salty, $query);

        if ($time > 0){
            $query->set('maxTotalTimeInSeconds', $time);
        }

        if ($cuisine != "-") {
            $query->set('allowedCuisine', $cuisine);
        }

        $query->set('maxResult', 16);
        $query->set('start', $start);
        $query->set('requirePictures', true);

        $query->setEncodingType(false);
        $query->setAggregator(Query::phpAggregator(false));

        $response = $this->client->send($r);

        $data = $response->json();
        return $data;
    }


    /**
     * @param $cuisine
     * @param $start
     * @return mixed
     */
    public function getCuisineResults($cuisine, $start){
        $r = $this->constructQuery();
        $query = $r->getQuery();
        $query->set('allowedCuisine', $cuisine);
        $query->set('maxResult', 16);
        $query->set('start', $start);
        $query->set('requirePictures', true);

        $query->setEncodingType(false);
        $query->setAggregator(Query::phpAggregator(false));
        $response = $this->client->send($r);

        $data = $response->json();
        return $data;
    }


    /**
     * @param $emotion
     * @param $start
     * @return mixed
     */
    public function getResultsByEmotion($emotion, $start){
        $r = $this->constructQuery();
        $query = $r->getQuery();

        if ($emotion == "happy"){
            $query->set('allowedCourse', 'course^course-Desserts');
        }

        if ($emotion == "sad"){
            $query->set('allowedIngredient', array('fish'));
        }

        if ($emotion == "angry"){
            $query->set('nutrition.FAT.min',0);
            $query->set('nutrition.FAT.max',1);
            $query->set('nutrition.CHOLE.min',0);
            $query->set('nutrition.CHOLE.max',0);
            $query->set('nutrition.K.min',0);
            $query->set('nutrition.K.max',100);
        }

        if ($emotion == "surprised"){
            $query->set('allowedCourse', 'course^course-Main%20Dishes');
        }

        $query->set('maxResult', 16);
        $query->set('start', $start);
        $query->set('requirePictures', true);

        $query->setEncodingType(false);
        $query->setAggregator(Query::phpAggregator(false));

        $response = $this->client->send($r);
        $data = $response->json();
        return $data;
    }


    public function fillIngredients(){
        $r = $this->constructQuery();
        $query = $r->getQuery();
        $query->set('allowedCourse', 'course^course-Breads');
        $query->set('maxResult', 4000);
        $query->set('start', 8000);
        $query->setEncodingType(false);
        $query->setAggregator(Query::phpAggregator(false));
        $response = $this->client->send($r);

        $data = $response->json();
        return $data;
    }
}

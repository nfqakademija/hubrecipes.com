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
    public function __construct($client, $appKey, $appId, $baseURL)
    {
        $this->baseURL = $baseURL;
        $this->client = $client;
        $this->appID = $appId;
        $this->appKey = $appKey;
    }

    function setFlavor($string, $flavor, $query){
        if ($flavor != ""){
            $query->set('flavor.'. $string .'.min',0);
            $query->set('flavor.'. $string .'.max',$flavor);
        }
        return $query;
    }

    /**
     * @param array $params
     * @return RecipeModel[]
     */

    public function getResults($sour,$salty,$sweet, $spicy, $bitter, $savory
        ,$time, $type, $allowedIngredients, $excludedIngredients, $start, $cuisine)
    {

        //$out = [];
        $r = $this->client->createRequest('get', $this->baseURL . 'recipes');
        $query = $r->getQuery();
        $query->set('_app_id', $this->appID);
        $query->set('_app_key', $this->appKey);

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
        /* foreach ($response as $item) {
            $recipe = new RecipeModel();
            $recipe->setTitle($item['title']);
            // ...
            $out[] = $recipe;
        }*/
        return $data;
    }

    public function constructQuery(){
        $r = $this->client->createRequest('get', $this->baseURL . 'recipes');
        $query = $r->getQuery();
        $query->set('_app_id', $this->appID);
        $query->set('_app_key', $this->appKey);
        return $r;
    }

    public function getCuisineResults($cuisine, $start){
        $r = $this->constructQuery();
        $query = $r->getQuery();
        /*$r = $this->client->createRequest('get', $this->baseURL . 'recipes');
        $query = $r->getQuery();
        $query->set('_app_id', $this->appID);
        $query->set('_app_key', $this->appKey);*/
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

    public function getResultsByEmotion($start){
        /*$r = $this->client->createRequest('get', $this->baseURL . 'recipes');
        $query = $r->getQuery();
        $query->set('_app_id', $this->appID);
        $query->set('_app_key', $this->appKey);*/

        $r = $this->constructQuery();
        $query = $r->getQuery();
        $query->set('allowedCourse', 'course^course-Desserts');

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
        $r = $this->client->createRequest('get', $this->baseURL . 'recipes');
        $query = $r->getQuery();
        $query->set('_app_id', $this->appID);
        $query->set('_app_key', $this->appKey);
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

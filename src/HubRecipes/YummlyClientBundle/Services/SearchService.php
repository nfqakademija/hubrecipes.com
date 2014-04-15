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

    /**
     * @param array $params
     * @return RecipeModel[]
     */
    public function getResults($sour,$salty,$sweet, $spicy, $bitter, $savory
        ,$time,$allowedIngredients, $excludedIngredients, $start)
    {
        //$out = [];
        $r = $this->client->createRequest('get', $this->baseURL . 'recipes');
        $query = $r->getQuery();
        $query->set('_app_id', $this->appID);
        $query->set('_app_key', $this->appKey);

        if(count($allowedIngredients) > 0){
            $query->set('allowedIngredient', $allowedIngredients);
        }

        if(count($excludedIngredients) > 0){
            $query->set('excludedIngredient', $excludedIngredients);
        }

        if($sour != ""){
            $query->set('flavor.sour.min',0);
            $query->set('flavor.sour.max',$sour);
        }

        if($sweet != ""){
            $query->set('flavor.sweet.min',0);
            $query->set('flavor.sweet.max',$sweet);
        }

        if($spicy != ""){
            $query->set('flavor.piquant.min',0);
            $query->set('flavor.piquant.max',$spicy);
        }

        if($bitter != ""){
            $query->set('flavor.bitter.min',0);
            $query->set('flavor.bitter.max',$bitter);
        }

        if($savory != ""){
            $query->set('flavor.meaty.min',0);
            $query->set('flavor.meaty.max',$bitter);
        }

        if($salty != ""){
            $query->set('flavor.salty.min',0);
            $query->set('flavor.salty.max',$salty);
        }

        if ($time > 0){
            $query->set('maxTotalTimeInSeconds', $time);
        }

        $query->set('maxResult', 16);
        //$query->set('requirePictures',true);
        $query->set('start', $start);
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

    public function getCuisineResults($cuisine, $start){
        $r = $this->client->createRequest('get', $this->baseURL . 'recipes');
        $query = $r->getQuery();
        $query->set('_app_id', $this->appID);
        $query->set('_app_key', $this->appKey);
        $query->set('allowedCuisine', $cuisine);
        $query->set('maxResult', 16);
        $query->set('start', $start);

        $query->setEncodingType(false);
        $query->setAggregator(Query::phpAggregator(false));
        $response = $this->client->send($r);

        $data = $response->json();
        return $data;
    }
}

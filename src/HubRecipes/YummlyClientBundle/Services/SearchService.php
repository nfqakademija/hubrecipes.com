<?php

namespace HubRecipes\YummlyClientBundle\Services;

use GuzzleHttp\Client;
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
    public function getResults($params)
    {
        $out = [];

        $response = $this->client->get($this->baseURL . "recipes" , [
            'query' => ['_app_id' => $this->appID,
                        '_app_key' => $this->appKey,
                        'allowedIngredient' => array('onion'),
                        'requirePictures' => 'true']
        ]);

       /* $r = $this->client->createRequest('get', $this->baseURL);
        $r->getQuery()->set('v1', [1,2]);

        $url = $this->baseURL.'?'.http_build_query(['v1' => [1,2]]);*/
        //print $url;

        //$response = $this->client->send($r);
        //print($r->getUrl());exit;



      /*  $c = new Guzzle\h('GET',$this->baseURL . "recipes");

        $request = $c->get();

        $q = $request->getQuery();
        $q->set('par', array('1','2'));

        $q->useUrlEncoding(false);

        $a = $c->send($request);*/


        //$response = json_decode($response);
        $data = $response->json();
        /* foreach ($response as $item) {
            $recipe = new RecipeModel();
            $recipe->setTitle($item['title']);
            // ...
            $out[] = $recipe;
        }*/

        return $data;
    }
}

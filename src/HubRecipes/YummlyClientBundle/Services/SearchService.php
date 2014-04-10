<?php

namespace HubRecipes\YummlyClientBundle\Service;

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
     * @param $client
     */
    public function __construct($client, $appKey, $appId)
    {
        $this->client = $client;
        $this->appID = $appId;
        $this->appKey = $appKey;
    }

    /**
     * @param array $params
     * @return RecipeModel[]
     */
    public function search($params)
    {
        $out = [];

        $response = $this->client->createRequest('get')->setPath('search')->setQuery([
                'sweetness' => 5
            ]);
        $response = json_decode($response);

        foreach ($response as $item) {
            $recipe = new RecipeModel();
            $recipe->setTitle($item['title']);
            // ...
            $out[] = $recipe;
        }

        return $out;
    }
}

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
     * @param $client
     */
    public function __construct($client)
    {
        $this->client = $client;
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

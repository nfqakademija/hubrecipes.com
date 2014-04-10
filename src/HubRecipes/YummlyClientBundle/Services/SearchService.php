<?php

namespace HubRecipes\YummlyClientBundle\Service;

use GuzzleHttp\Client;

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
     */
    public function search($params)
    {
        $response = $this->client->createRequest('get')->setPath('search')->setQuery([
                'sweetness' => 5
            ]);
        return json_decode($response);
    }
}

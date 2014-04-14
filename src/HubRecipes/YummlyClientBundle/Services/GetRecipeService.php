<?php
/**
 * Created by PhpStorm.
 * User: miezis
 * Date: 4/10/14
 * Time: 6:19 PM
 */

namespace HubRecipes\YummlyClientBundle\Services;

use GuzzleHttp\Client;
use HubRecipes\YummlyClientBundle\Model\RecipeModel;

class GetRecipeService {
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

    public function getRecipe($id){
        $response = $this->client->get($this->baseURL . "recipe/" . $id , [
            'query' => ['_app_id' => $this->appID,
                        '_app_key' => $this->appKey]
        ] );
        $response = $response->json();

        //return var_dump($data['flavors']);
        return $response;
        //['ingredientLines']
       // $client->get('http://httpbin.org', [
       //     'query' => ['foo' => 'bar']
       // ]);
    }

} 
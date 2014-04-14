<?php

namespace HubRecipes\YummlyClientBundle\Controller;

use HubRecipes\YummlyClientBundle\Services\SearchService;
//use HubRecipes\YummlyClientBundle\Services\GetRecipeService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        /** @var SearchService $search */
      //  $search = $this->get('hub_recipes_yummly_client.search_service');

      //  $results = $search->search(['sss' => 'sdfsf']);
        $getRecipe = $this->get('hub_recipes_yummly_client.getrecipe_service');
        $recipe = $getRecipe->getRecipe($name);
        return $this->render('HubRecipesYummlyClientBundle:Default:index.html.twig', array('response' => $recipe));
    }


}

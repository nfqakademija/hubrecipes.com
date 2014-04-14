<?php

namespace HubRecipes\YummlyClientBundle\Controller;

use HubRecipes\YummlyClientBundle\Services\SearchService;
//use HubRecipes\YummlyClientBundle\Services\GetRecipeService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

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

    public function searchResultsAction(Request $request){
        $withIngredients = $request->query->get('likeIngredients');
        $withoutIngredients = $request->query->get('unlikeIngredients');

        $time = $request->query->get('Time');
        $sour = $request->query->get('Sour');
        $salty = $request->query->get('Salty');
        $sweet = $request->query->get('Sweet');
        $spicy = $request->query->get('Spicy');
        $bitter = $request->query->get('Bitter');
        $savory = $request->query->get('Savory');
        $time = $request->query->get('Time');

        /** @var SearchService $search */
        $getResults = $this->get('hub_recipes_yummly_client.search_service');
        $results = $getResults->getResults($withIngredients);

        return $this->render('HubRecipesFrontEndBundle:Default:results.html.twig', array('results' => var_dump($results) ));
    }


}

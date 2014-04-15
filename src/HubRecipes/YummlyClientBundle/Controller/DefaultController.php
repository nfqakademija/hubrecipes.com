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
        $withIngredientsI = [];
        $withoutIngredientsI = [];
        $withIngredients = $request->query->get('likeIngredients');
        $withoutIngredients = $request->query->get('unlikeIngredients');

        for($i=0; $i < count($withIngredients) - 1; $i++){
            $withIngredientsI[$i] = $withIngredients[$i];
        }

        for($i=0; $i < count($withoutIngredients) - 1; $i++){
            $withoutIngredientsI[$i] = $withoutIngredients[$i];
        }

        $sour = $request->query->get('Sour');
        $salty = $request->query->get('Salty');
        $sweet = $request->query->get('Sweet');
        $spicy = $request->query->get('Spicy');
        $bitter = $request->query->get('Bitter');
        $savory = $request->query->get('Savory');
        $time = $request->query->get('Time')*60;
        $type = $request->query->get('Type');
        $start = 0;

        /** @var SearchService $search */
        $getResults = $this->get('hub_recipes_yummly_client.search_service');
        $results = $getResults->getResults($sour,$salty, $sweet, $spicy, $bitter, $savory, $time, $type, $withIngredientsI, $withoutIngredientsI,$start);

        return $this->render('HubRecipesFrontEndBundle:Default:results.html.twig', array('results' => $results ));
    }

    public function searchByCuisineAction($cuisine){

        $getResults = $this->get('hub_recipes_yummly_client.search_service');
        $results = $getResults->getCuisineResults($cuisine, 0);
        return $this->render('HubRecipesFrontEndBundle:Default:results.html.twig', array('results' => $results ));
    }
}

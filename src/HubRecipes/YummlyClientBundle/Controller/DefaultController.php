<?php

namespace HubRecipes\YummlyClientBundle\Controller;

use HubRecipes\YummlyClientBundle\Services\SearchService;
//use HubRecipes\YummlyClientBundle\Services\GetRecipeService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use HubRecipes\FrontEndBundle\Entity\Ingredients;

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

        $removeEmpty = function($value){
            return $value != "";
        };

        function replace($value){
            return explode(',', $value )[0];
        };

        $withIngredients = $request->query->get('likeIngredients');
        $withoutIngredients = $request->query->get('unlikeIngredients');

        $withIngredients = array_filter($withIngredients, $removeEmpty);

        foreach($withIngredients as &$ingredient){
            $ingredient = rawurlencode($ingredient);
        }
        unset($withIngredients[count($withIngredients)-1]);

        $withoutIngredients = array_filter($withoutIngredients, $removeEmpty);

        foreach($withoutIngredients as &$ingredient){
            $ingredient = rawurlencode($ingredient);
        }

        unset($withoutIngredients[count($withoutIngredients)-1]);

        $sour = replace($request->query->get('Sour'));
        $salty = replace($request->query->get('Salty'));
        $sweet = replace($request->query->get('Sweet'));
        $spicy = replace($request->query->get('Spicy'));
        $bitter = replace($request->query->get('Bitter'));
        $savory = replace($request->query->get('Savory'));
        $time = replace($request->query->get('Time'))*60;
        $type = replace($request->query->get('Type'));
        $cuisine = replace($request->query->get('Cuisine'));
        $start = 0;

        /** @var SearchService $search */
        $getResults = $this->get('hub_recipes_yummly_client.search_service');
        $results = $getResults->getResults($sour,$salty, $sweet, $spicy, $bitter, $savory, $time, $type, $withIngredients, $withoutIngredients, $start, $cuisine);

        return $this->render('HubRecipesFrontEndBundle:Default:results.html.twig', array('results' => $results,
            'likeI' => $withIngredients, 'unlikeI' => $withoutIngredients, 'Sour' => $sour, 'Salty' => $salty, 'Sweet' => $sweet, 'Spicy' => $spicy, 'Bitter' => $bitter,
            'Savory' => $savory, 'Time' => $time, 'Type' => $type, 'Cuisine' => $cuisine
        ));
    }

    public function searchByCuisineAction($cuisine, $start){

        $getResults = $this->get('hub_recipes_yummly_client.search_service');
        $results = $getResults->getCuisineResults($cuisine, $start);

        return $this->render('HubRecipesFrontEndBundle:Default:results.html.twig', array('results' => $results,
            'likeI' => '', 'unlikeI' => '', 'Sour' => '', 'Salty' => '', 'Sweet' => '', 'Spicy' => '', 'Bitter' => '',
            'Savory' => '', 'Time' => '', 'Type' => '-', 'Cuisine' => $cuisine
        ));
    }

    public function loadMoreItemsAction() {
        if ($this->get('request')->isXmlHttpRequest()){
            $cuisine = $this->get('request')->request->get('cuisine');
            $sour = $this->get('request')->request->get('sour');
            $salty = $this->get('request')->request->get('salty');
            $sweet = $this->get('request')->request->get('sweet');
            $spicy = $this->get('request')->request->get('spicy');
            $bitter = $this->get('request')->request->get('bitter');
            $savory = $this->get('request')->request->get('savory');
            $time = $this->get('request')->request->get('timee');
            $type = $this->get('request')->request->get('typeS');
            $k = $this->get('request')->request->get('start');
            $like = $this->get('request')->request->get('like');
            if ($like == ""){
                $like = [];
            }
            $unlike = $this->get('request')->request->get('unlike');
            if ($unlike == ""){
                $unlike = [];
            }
            $getResults = $this->get('hub_recipes_yummly_client.search_service');
            $results = $getResults->getResults($sour,$salty, $sweet, $spicy, $bitter, $savory, $time, $type, $like, $unlike, $k, $cuisine);
            return new JsonResponse(array('res'=>$results));
        }
    }

    public function fillIngredientsAction(){
        $getResults = $this->get('hub_recipes_yummly_client.search_service');
        $results = $getResults->fillIngredients();
        $em = $this->getDoctrine()->getManager();
        $yra = false;
        $new = 0;
        for($i = 0; $i < count($results); $i++){
            $yra = false;
            $query = $em->createQuery(
                'SELECT i.ingredient
                 FROM HubRecipes\\FrontEndBundle\\Entity\\Ingredients i
                  ');
            $products = $query->getArrayResult();
            for($j = 0; $j < count($results['matches'][$i]['ingredients']); $j++){
                for($jj = 0; $jj < count($products); $jj++){
                    if($products[$jj]['ingredient'] == $results['matches'][$i]['ingredients'][$j]){
                        $yra = true;
                    }
                }
                if(!$yra){
                    $ing = new Ingredients();
                    $ing->setIngredient($results['matches'][$i]['ingredients'][$j]);
                    $em = $this->getDoctrine()->getManager();
                    $em->persist($ing);
                    $em->flush();
                    $new++;
                }
               $yra = false;
            }
        }
        print $new;
    }
}

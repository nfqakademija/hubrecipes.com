<?php

namespace HubRecipes\FrontEndBundle\Controller;

use HubRecipes\FrontEndBundle\Entity\Ingredients;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use HubRecipes\YummlyClientBundle\Services\SearchService;

class DefaultController extends Controller
{
    private $sour;
    private $salty;
    private $sweet;
    private $spicy;
    private $bitter;
    private $savory;

    function __construct()
    {
        $this->sour = rand(0,10000)/10000;
        $this->salty = rand(0,10000)/10000;
        $this->sweet = rand(0,10000)/10000;
        $this->spicy = rand(0,10000)/10000;
        $this->bitter = rand(0,10000)/10000;
        $this->savory = rand(0,10000)/10000;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getRecipe($id) {
        $getRecipe = $this->get('hub_recipes_yummly_client.getrecipe_service');
        $recipe = $getRecipe->getRecipe($id);
        return $recipe;
    }

    /**
     * @param $start
     * @return mixed
     */
    public function getHomePageRecipes($start){
        $getRecipes = $this->get('hub_recipes_yummly_client.search_service');
        $withIngredientsI = [];
        $withoutIngredientsI = [];
        $sour = $this->sour;
        $salty = $this->salty;
        $sweet = $this->sweet;
        $spicy = $this->spicy;
        $bitter = $this->bitter;
        $savory = $this->savory;
        $time = "";
        $cuisine = '-';
        $type = '-';
        $results = $getRecipes->getResults($sour,$salty, $sweet, $spicy, $bitter, $savory, $time, $type, $withIngredientsI, $withoutIngredientsI, $start, $cuisine);
        return $results;
    }

    /**
     * @param $start
     * @return Response
     */
    public function indexAction($start)
    {
        $results = $this->getHomePageRecipes($start);
        return $this->render('HubRecipesFrontEndBundle:Default:index.html.twig', array('response' => $results));
    }

    /**
     * @return Response
     */
    public function favouritesAction(){
        return $this->render('HubRecipesFrontEndBundle:Default:favourites.html.twig');
    }

    /**
     * @return JsonResponse
     */
    public function loadMoreHomePageAction()
    {
        if ($this->get('request')->isXmlHttpRequest()){
            $start = $this->get('request')->request->get('start');
            $results = $this->getHomePageRecipes($start);
            return new JsonResponse(array('response'=>$results));
        }
    }

    /**
     * @param $id
     * @return Response
     */
    public function recipeAction($id)
    {
        $recipe = $this->getRecipe($id);
        return $this->render('HubRecipesFrontEndBundle:Default:single.item.html.twig', array('response' => $recipe));
    }


    /**
     * @param $id
     * @return Response
     */
    public function fullRecipeAction($id)
    {
        $recipe = $this->getRecipe($id);
        return $this->render('HubRecipesFrontEndBundle:Default:full.page.html.twig', array('response' => $recipe));
    }

    /**
     * @return JsonResponse
     */
    public function getIngredientsAction(){
        if ($this->get('request')->isXmlHttpRequest()){
            $what = $this->get('request')->request->get('data');

            $em = $this->getDoctrine()->getManager();
            $query = $em->createQuery(
               'SELECT i.ingredient
                FROM HubRecipes\\FrontEndBundle\\Entity\\Ingredients i
                WHERE i.ingredient LIKE :a ')->setParameter('a','%' . $what . '%');

            $em->flush();
            $products = $query->getArrayResult();
            $a = [];
            if (!$products) {
                $a =[''];
                return new JsonResponse(array("suggestions" => $a));
            }
            for($i = 0; $i < count($products); $i++){
                $a[$i] = $products[$i]['ingredient'];
            }
            return new JsonResponse(array("suggestions" => $a));
        }
    }

    /**
     * @return JsonResponse
     */
    public function existsAction(){
        if ($this->get('request')->isXmlHttpRequest()){
            $what = $this->get('request')->request->get('data');

            $em = $this->getDoctrine()->getManager();
            $query = $em->createQuery(
                'SELECT i.ingredient
                 FROM HubRecipes\\FrontEndBundle\\Entity\\Ingredients i
                 WHERE i.ingredient LIKE :a ')->setParameter('a', $what );
            $products = $query->getArrayResult();
            $em->flush();
            if (!$products) {
                return new JsonResponse(array("exists" => 'no'));
            } else {
                return new JsonResponse(array("exists" => 'yes'));
            }
        }
    }

}